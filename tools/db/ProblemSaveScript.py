import pandas as pd
import pymysql

HOST = '127.0.0.1'
PORT = 3306
USER = 'root'
PASSWORD = 'pw'
DB_NAME = 'test'
conn = pymysql.connect(host=HOST, port=PORT, user=USER, password=PASSWORD, db=DB_NAME, charset='utf8')
curs = conn.cursor()

EXCEL_FILE = 'Problem.xlsx'
df = pd.read_excel(EXCEL_FILE)

for i in range(len(df.index)):
    if pd.isna(df.iloc[i,2]) and pd.isna(df.iloc[i,3]):
        continue
    query = 'INSERT INTO problem(category_id, member_id, title, content) VALUES(%s,%s,%s,%s)'
    curs.execute(query, (int(df.iloc[i,0]), int(df.iloc[i,1]), df.iloc[i,2], df.iloc[i,3]))
    conn.commit()
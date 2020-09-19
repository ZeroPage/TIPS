# Contributing guidelines

## Issues

- **Please search internet first to find the answer.**
- If a **similar** issue exists, append **comment** to it.
- If there are **multiple** issues, make issues **separately**.
- If you find a **security vulnerability**, please send an **email** to the maintainers before it is exposed to **bad crackers**.
- **Please Check below before report a bug.**
  - Browser type, version
  - Node.js version
  - Server configurations
- **Please include below information in bug report.**
  - Environment
    - TIPS version, e.g. 1.0.0
    - Browser type, version, e.g. IE 11
    - Node.js version, e.g. 14.10.1
    - Server information, e.g. Amazon AWS t2.micro
  - Entire error message
    - Web page screenshots
    - Screenshots of console, network tab in browser developer tool
  - Website addess which shows the problem

## Pull requests (PR)

- **Make a topic branch in your forked repository** and do your jobs then send **PR to `develop` branch of this original repository**.
  - **Topic branch naming rule:** `do/something` form.
    - **"do" part** is an appropriate **verb**.
    - **"something" part** is a **description** which implies the detail of the PR.
    - If you **can't** find intutive "do" part verb, **just simply use `pr/something` form**.
  - **Example:** If you solve a bug related to icons, make `fix/icon` branch and do your jobs.
    If you improved network related features, make `pr/network` branch and do your jobs.

## Coding style guide

### General

Character set of all kinds of text files including HTML, CSS, JavaScript, XML are **UTF-8 without BOM**.

Line break type is **Unix(`LF`)**.

Indent with **4 spaces**.

Empty lines are **not** indented.

### Whitespace / Line break

Use brace at the **same line** in case of function declarations and `if`, `for`, `while`.

    while (flag1) {    // RIGHT
        if (flag2)
        {              // WRONG
            
        }
    }

Altough there is only one statement **must use braces** for further statement addition.

    if (flag1) return false;    // WRONG
    if (flag2) {                // RIGHT
        return true;
    }

In JavaScript, almost every functions are closures then a semicolon can be inserted accidentally
so use brace at the same line.

    $("#foo").on("click", function() {    // OK
        if ($(this).val() === "bar") {    // OK
            $(this).val("baz");
        }
    });

When invoke a function **do not place spaces** between function name, parentheses, arguments.
Place a space after comma.

    function foobar(baz, param)        // RIGHT
    function foobar ( baz , param )    // WRONG

Place a space after the keywords `if`, `for`, `while`, etc.
Place s space before and after the operators `==`, `!=`, `>`, etc.

    if (foo === bar) {    // RIGHT
    if(foo==bar){       // WRONG

In JavaScript and JSON, when define an array spanning multiple lines **must remove the last comma**.
If the last comma is left, an error may occur in some browsers.

    var animals = [
        'bear',
        'cat',
        'dog'    // NO COMMA
    ];

### Comments

**In general**, write a comment in **English** consting complete sentences with capitalization.

Leave comments above the related codes.

    // If flag is true, do something.
    if (flag) {
        // Note: this will do X, Y, and Z.
        doSomething();
    }

### Commits

In general, write a commit message in **English** starting with an infinitive verb.
Do not place a period at the end of the commit message.

    Delete unnecessary condition     // RIGHT
    Fix #1234                        // RIGHT
    Deletes unnecessary condition.    // WRONG (unnecessary conjugation and period)
    Fixed #1234                      // WRONG (unnecessary past form)

If you want to write a commit message in **Korean**, it is also **accepted**.
이 규칙에 맞추어 영문으로 커밋 메시지를 작성하기 어려운 경우, **한글로 작성해도 무방합니다**.
한글 커밋 메시지는 **어디서** **무엇을** **어떻게** 했는지 간결하고 명확하고 격식 있게 표현하며,
가능하면 현재형 동사로 마치도록 합니다. 또한, 문장 끝에 마침표를 사용하지 않습니다.

    크롬 최신 버전에서 스크립트 오류 해결   // RIGHT
    Foo 클래스에 bar() 메소드 추가       // RIGHT
    서버 통신 에러 나는 거 고쳤어요. 헣~^^ // WRONG (격식 없는 표현과 불필요한 마침표)
    함수 개선                          // WRONG (두리뭉실한 표현)

### Etc.

The main goal is **not producing any error** in all of supported browsers with default settings using the **Strict mode**
but **do not produce warnings as far as possible**.

When compare two strings, two integers **use `===` rather than `==`** so far as possible.

In case of the situations which is not included in here, follow
[Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html).

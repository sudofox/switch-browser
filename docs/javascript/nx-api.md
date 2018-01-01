# NX api

`window.nx` exposes a small API for accessing various browser features from within Javascript. The properties and methods documented here are available across all of the Switch's browser applets, however certain applets (such as eshop) may expose more.

### Properties

#### `isKeyboardShown`

* **Type:** `{Boolean}`

* **Usage:**

    Indicates whether or not the keyboard UI is active.

### Methods

#### `canHistoryBack`

* **Returns:** `{Boolean}`

* **Usage:**

    Returns `true` if the user can navigate to the previous page (untested but assumed).

#### `endApplet`

* **Returns:** `{Boolean}`

* **Usage:**

    Closes the browser applet.

#### `openTimeoutDialog`

* **Arguments:**

    * `{String}` message

* **Usage:** 

    Show a message for a short period of time.

#### `open1ButtonDialog`

* **Arguments:**

    * `{String}` message
    * `{String}` buttonText

* **Usage:** 

    Show a message with a custom 'OK' button.

* **Example:**

    ```js
    nx.open1ButtonDialog("I'm a message!", "OK!");
    ```

#### `open2ButtonDialog`

* **Arguments:**

    * `{String}` message
    * `{String}` left button text
    * `{String}` right button text

* **Usage:** 

    Show a message with custom 'Cancel' and 'OK' buttons.

* **Example:**

    ```js
    nx.open2ButtonDialog("I'm a message!", "Cancel", "OK!");
    ```

#### `footer.setDefaultAssign`

* **Arguments:**

    * `{String}` key (`"A"`, `"B"`, `"X"` or `"Y"`)
    * `{String}` label

* **Usage:** 

    Add a prompt for a given button to the footer. The button will retain its default behaviour, but the label given to it can be set to whatever you like.

#### `footer.setAssign`

* **Arguments:**

    * `{String}` key (`"A"`, `"B"`, `"X"` or `"Y"`)
    * `{String}` label
    * `{Function}` callback
    * `{Object}` params
        * `{String}` `se` (sound effect label)

* **Usage:** 

    Add a prompt for a given button to the footer, and override its default behaviour(?). The `callback` function given will be called whenever the button is pressed.

* **Example:**

    ```js
    // When the A button is pressed, alert the user, and play the "SeWebBtnDecide" sound effect

    nx.footer.setAssign("A", "Test", function() {
      alert("A key pressed!")
    }, {
      se: "SeWebBtnDecide"
    });
    ```

#### `footer.unsetAssign`

* **Arguments:**

    * `{String}` key (`"A"`, `"B"`, `"X"` or `"Y"`)

* **Usage:** 

    Remove a button prompt added with `footer.setAssign`.

#### `playSystemSe`

* **Arguments:**

    * `{String}` soundLabel

* **Usage:** 

    Play a predefined sound effect from the following list of `soundLabel` values:

    ```
    SeToggleBtnFocus
    SeToggleBtnOn
    SeToggleBtnOff
    SeCheckboxFocus
    SeCheckboxOn
    SeCheckboxOff
    SeRadioBtnFocus
    SeRadioBtnOn
    SeSelectCheck
    SeSelectUncheck
    SeBtnDecide
    SeTouchUnfocus
    SeBtnFocus
    SeKeyError
    SeDialogOpen
    SeWebZoomOut
    SeWebZoomIn
    SeWebNaviFocus
    SeWebPointerFocus
    SeFooterFocus
    SeFooterDecideBack
    SeFooterDecideFinish
    SeWebChangeCursorPointer
    SeWebTouchFocus
    SeWebLinkDecide
    SeWebTextboxStartEdit
    SeWebButtonDecide
    SeWebRadioBtnOn
    SeWebCheckboxUncheck
    SeWebCheckboxCheck
    SeWebMenuListOpen
    ```

#### `stopSystemSe`

* **Usage:** 

    Stop sound effect playback.
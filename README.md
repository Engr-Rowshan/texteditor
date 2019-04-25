# TextEditor - A jQuery Plugins

Once I have used TinyMCE jQuery Plugin to use as the texteditor for HTML form. But now TinyMCE is not free anymore, lots of feature are moved to pro version. 
So for one of my project I was in need to a plugins of jQuery TextEditor. I could use others plugins from internet, but little bit concerned about the security. Then I thought why not just create one by myself. Now here it is.

## Features
- Default Buttons
- Custom Buttons
- Custom Function Callback
- Font Awesome Icons
- Multiple element on same page support
- Custom Css loading
- Auto Css loading

## How to use
- Insert the texteditor.js into the body
- Make sure load it after loading jQuery
- Call on element
```javascript
$(".textbox").textEditor();
```
- To pass option
```javascript
$(".textbox").textEditor({
    'buttons':['bold','italic']
})
```

## Available options
Working on it.

var useCharacterAsCursor = (function() {
    var size = 24,
        canvas,
        context;

    // Initialize canvas
    canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;

    // Store context & set styling
    context = canvas.getContext("2d");
    context.font = size + "px sans-serif";
    context.textBaseline = "middle";
    context.textAlign = "center";

    return function(character) {
        if (!character) {
            // If no character is provided, reset to default 
            // to make sure there's a cursor shown
            document.body.style.cursor = "default";
            return;
        }
        // Clear previously drawn stuff (context is reused)
        context.clearRect(0, 0, canvas.width, canvas.height);

        context.fillText(character, size / 2, size / 2);
        var imgDataURL = canvas.toDataURL();

        // Use offset to reposition the cursor 
        // Two unit-less non-negative numbers less than 32
        // (https://developer.mozilla.org/en-US/docs/Web/CSS/cursor)
        // Use `auto` so the browser can still use the right cursor 
        // for interactive elements
        var offset = (size / 2) + " 0";
        document.body.style.cursor = "url(" + imgDataURL + ") " + offset + ", auto";
    };
}());

export default useCharacterAsCursor;
#!/bin/bash
# Double-click this file to open Arya's Reading Log with the microphone working.
cd "$(dirname "$0")" || exit 1
PORT=8899
echo "📚 Starting Arya's Reading Log at http://localhost:$PORT"
echo "   (Keep this window open while you use it. Close it when you are done.)"
sleep 1
open "http://localhost:$PORT/index.html"
python3 -m http.server $PORT

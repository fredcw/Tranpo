# Tranpo
Two scripts to assist with translating .po files using online translation services. 

**tranpo.js**: This script will extract all the untranslated strings from a .po file and output them to the terminal, one per line.

Usage: `tranpo.js <path to .po file>`

**tranpo2.js**: This script will take two arguments, the path to the .po file to update with new translations and the path to a text file containing the new translations, one per line and in the same order and quantity as the output from script tranpo.js
  
Usage: `tranpo2.js <path to .po file> <path to text file containing translations only>`
  
The idea is that you use tranpo.js to extract the untranslated strings from the .po file. You then copy/paste these into an online translation service (google translate or deepl) and then copy the translations and paste them into a new text file. You then call tranpo2.js with the original .po file and the text file containing the translations and the script will insert each translation (one per line) into the .po, one for each untranslated string. For this reason, the translations must be of the same quantity and in the same order as the untranslated strings extracted using tranpo.js.
  
**Notes:**
  
  These scripts do not expect any unusual formating of the .po file. To make sure they are formatted correctly, open and then save the .po file with Poedit first.
  
  It's probably a good idea to first delete (using poedit) any fuzzy translations that poedit has made as these are usually incorrect anyway.
  
  It's probably easiest to copy both scripts into the po folder.
  
  Before overwriting, tranpo2.js will make a backup copy of the original .po file called xx.po~

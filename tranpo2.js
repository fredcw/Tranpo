#!/usr/bin/cjs

const Gio = imports.gi.Gio;
const ByteArray = imports.byteArray;

function main() {
    let file_name = ARGV[0];
    let data;
    let ok, etag;

    file = Gio.File.new_for_path(file_name);

    if (!file.query_exists(null)) {
        print('Error: File not found.');
        return;
    }

    [ok, contents, etag] = file.load_contents(null);

    if (ok != true){
        print('Error: Cannot read file.');
        return;
    }

    data = contents;

    if (data instanceof Uint8Array) {
        data = ByteArray.toString(data);
    } else {
        print("Data not Uint8Array... continuing...");
        data = data.toString();
    }

    let transfile_name = ARGV[1];
    let transdata;
    let tok, tetag;

    transfile = Gio.File.new_for_path(transfile_name);

    if (!transfile.query_exists(null)) {
        print('Error: Translations file not found.');
        return;
    }

    [tok, translations, tetag] = transfile.load_contents(null);

    if (tok != true){
        print('Error: Cannot read translations file.');
        return;
    }

    transdata = translations;

    if (transdata instanceof Uint8Array) {
        transdata = ByteArray.toString(transdata);
    } else {
        print("transdata not Uint8Array... continuing...");
        transdata = transdata.toString();
    }

    let transa = transdata.split("\n");

    //concatenate all strings divided over multiple lines
    const regex = /"\n"/g;
    data = data.replaceAll(regex, '');

    let copyout = "";
    let c = 0;
    let i = data.indexOf('\nmsgstr ""');
    while (i > -1) {
        if (!transa[c]) {
            print("Translation missing or not enough translations. Aborting.");
            return;
        }
        data = data.substring(0, i + 9) + transa[c] + data.substring(i + 9);

        c++;
        i = data.indexOf('\nmsgstr ""', i + 1);
    }

    print(c + " strings translated.");

    //print(data);

    file.replace_contents(data, etag, true, null, null); //replace original .po file and make a backup (.po~)
}

main();

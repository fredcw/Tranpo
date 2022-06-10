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

    //concatenate all strings divided over multiple lines
    const regex = /"\n"/g;
    data = data.replaceAll(regex, '');

    let c = 0;
    let copyout = "";
    let i = data.indexOf('\nmsgstr ""');
    while (i > -1) {
        let datasub = data.substr(0, i);
        let org_i = datasub.lastIndexOf("msgid");
        let msgid = datasub.substring(datasub.indexOf('"', org_i) + 1, datasub.lastIndexOf('"'));
        copyout += msgid + "\n";

        c++;
        i = data.indexOf('\nmsgstr ""', i + 1);
    }

    if (copyout.length == 0) {
        print("No untranslated strings found.");
        return;
    } else {
        print(c + " untranslated strings found");
        print("");
    }

    print(copyout);

}

main();

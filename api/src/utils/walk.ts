import fs from 'fs';

/**
 * dir: path to the directory to explore
 * action(file, stat): called on each file or until an error occurs. file: path to the file. stat: stat of the file (retrived by fs.stat)
 * done(err): called one time when the process is complete. err is undefined is everything was ok. the error that stopped the process otherwise
 */

type WalkOut = { file: string, stat: fs.Stats }[]

export default function walk(dir: string, action: 'file' | 'stat') {
    return new Promise<WalkOut>((res, rej) => {

        let final: WalkOut = [];

        // this flag will indicate if an error occured (in this case we don't want to go on walking the tree)
        var dead = false;

        // this flag will store the number of pending async operations
        var pending = 0;

        var fail = function (err: Error) {
            if (!dead) {
                dead = true;
                rej(err)
            }
        };

        var checkSuccess = function () {
            if (!dead && pending == 0) {
                res(final);
            }
        };



        var performAction = function (file: string, stat: any) {
            if (!dead) {
                try {
                    final.push({ file, stat })
                }
                catch (error) {
                    fail(error);
                }
            }
        };

        // this function will recursively explore one directory in the context defined by the variables above
        var dive = function (dir: string) {
            pending++; // async operation starting after this line
            fs.readdir(dir, function (err, list) {
                if (!dead) { // if we are already dead, we don't do anything
                    if (err) {
                        fail(err); // if an error occured, let's fail
                    }
                    else { // iterate over the files
                        list.forEach(function (file) {
                            if (!dead) { // if we are already dead, we don't do anything
                                var path = dir + "/" + file;
                                pending++; // async operation starting after this line
                                fs.stat(path, function (err, stat) {
                                    if (!dead) { // if we are already dead, we don't do anything
                                        if (err) {
                                            fail(err); // if an error occured, let's fail
                                        }
                                        else {
                                            if (stat && stat.isDirectory()) {
                                                dive(path); // it's a directory, let's explore recursively
                                            }
                                            else {
                                                performAction(path, stat); // it's not a directory, just perform the action
                                            }
                                            pending--; checkSuccess(); // async operation complete
                                        }
                                    }
                                });
                            }
                        });
                        pending--; checkSuccess(); // async operation complete
                    }
                }
            });
        };

        // start exploration
        dive(dir);
    })
};
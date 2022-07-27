mod audio_handler;

use std::env;
// use std::{env, path::Path, fs::File};
// use std::io::prelude::*;

fn main() {
    let args: Vec<String> = env::args().collect();
    if args.len() != 2 {
        eprintln!("Usage: cargo run [filename]");
        print!("Failed");
        return;
    }
    let file_name = args[1].as_str();

    let sheet = match audio_handler::sheet::Sheet::new(file_name) {
        Ok(value) => value,
        Err(()) => {
            print!("Failed");
            return;
        }
    };

    if sheet.create_wav(file_name).is_err() {
        print!("Failed");
        return;
    }

    /* Test for piano */
    // let path = Path::new("./piano.wav");

    // let mut file = match File::open(path) {
    //     Ok(file) => file,
    //     Err(error) => {
    //         eprintln!("{}", error);
    //         return;
    //     }
    // };

    // let mut victim = File::create(Path::new("./victim.wav")).unwrap();

    // let mut buf = vec![];
    // let size = file.read_to_end(&mut buf).unwrap();
    // sheet.write_wav_header(&mut victim, size * 2).unwrap();
    // victim.write_all(&buf).unwrap();
    // victim.write_all(&buf).unwrap();

    print!("Success");
}

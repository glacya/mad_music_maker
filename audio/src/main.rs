mod audio_handler;

use std::env;

fn main() {
    let args: Vec<String> = env::args().collect();
    if args.len() != 2 {
        eprintln!("Usage: cargo run [filename]");
        println!("Failed");
        return;
    }
    let file_name = args[1].as_str();

    let sheet = match audio_handler::sheet::Sheet::new(file_name) {
        Ok(value) => value,
        Err(()) => {
            println!("Failed");
            return;
        }
    };

    if sheet.create_wav(file_name).is_err() {
        println!("Failed");
        return;
    }

    
    println!("Success");
}

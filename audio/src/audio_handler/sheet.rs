use std::collections::HashSet;
use std::fs::File;
use std::io::prelude::*;
use std::path::Path;
use super::wave;
use super::adsr;

#[derive(Eq, PartialEq, Copy, Clone, Hash)]
pub enum NoteType {
    Sine,
    Square,
    Triangle,
    Saw,
    Synth1,
}

impl NoteType {
    pub fn note_type(name: &str) -> NoteType {
        match name {
            "sine" => NoteType::Sine,
            "square" => NoteType::Square,
            "triangle" => NoteType::Triangle,
            "saw" => NoteType::Saw,
            "synth1" => NoteType::Synth1,
            _ => panic!("aaa"),
        }
    }
}



/// Represents one note.
#[derive(Eq, PartialEq, Copy, Clone, Hash)]
pub struct Note {
    start: usize,
    length: usize,
    pitch: usize,
    note_type: NoteType,
}

impl Note {
    pub fn new(start: usize, length: usize, pitch: usize, note_type: NoteType) -> Note {
        Note {
            start,
            length,
            pitch,
            note_type,
        }
    }

    // Get frequency of current note, in Hz.
    // Pitch A4 has 440Hz frequency.
    pub fn get_frequency(&self) -> f64 {
        let pitch_num = (self.pitch + 3) as f64;
        let pitch_distance = f64::ln(2.0) * pitch_num / 12.0 + f64::ln(440.0);
        f64::exp(pitch_distance)
    }

    /// Computes wave function according to note type.
    /// TODO: Implement phase of wave function.
    pub fn compute_wave(&self, amplitude: usize, index: usize) -> f64 {
        let frequency = self.get_frequency() / 2.0;
        match self.note_type {
            NoteType::Sine => {
                wave::wave_sine(amplitude, frequency, index)
            }
            NoteType::Square => {
                wave::wave_square(amplitude, frequency, index)
            }
            NoteType::Triangle => {
                wave::wave_triangle(amplitude, frequency, index)
            }
            NoteType::Saw => {
                wave::wave_saw(amplitude, frequency, index)
            }
            NoteType::Synth1 => {
                wave::wave_synth1(amplitude, frequency, index)
            }
        }
    }

    /// Computes adsr function according to note type.
    pub fn compute_adsr(&self, chunks_per_length: usize, current_index: usize) -> f64 {
        let start_index = chunks_per_length * self.start;
        match self.note_type {
            NoteType::Sine => {
                adsr::adsr_full_linear(current_index, start_index)
            }
            NoteType::Square => {
                adsr::adsr_plain(current_index, start_index)
            }
            NoteType::Triangle => {
                adsr::adsr_plain(current_index, start_index)
            }
            NoteType::Saw => {
                adsr::adsr_plain(current_index, start_index)
            }
            NoteType::Synth1 => {
                adsr::adsr_full_exponential(current_index, start_index)
            }
        }
    }
}

/// Represents whole sheets.
pub struct Sheet {
    tempo: usize,         // beats per minute.
    total_length: usize,        // length means total length. 1 beats = 4 length.
    // number_of_notes: usize,    // not included here.
    notes: Vec<Note>
}

impl Sheet {
    pub fn new(file_name: &str) -> Result<Self, ()> {
        let path_name = format!("./jsons/{}.json", file_name);
        let path = Path::new(path_name.as_str());
        let mut file = match File::open(path) {
            Ok(f) => f,
            Err(error) => {
                eprintln!("Couldn't open file {}, because {}", path_name, error);
                return Err(())
            }
        };

        let mut buf = "".to_string();
        match file.read_to_string(&mut buf) {
            Ok(_) => (),
            Err(error) => {
                eprintln!("Couldn't read from file {}, because {}", path_name, error);
                return Err(())
            }
        }

        let content = match json::parse(buf.as_str()) {
            Ok(v) => v,
            Err(error) => {
                eprintln!("Something went wrong during parsing file {}", path_name);
                eprintln!("{}", error);
                return Err(())
            }
        };

        let tempo = Self::real::<usize>(content["tempo"].as_usize())?;
        let total_length = Self::real::<usize>(content["total_length"].as_usize())?;
        if (total_length == 0) {
            eprintln!("Total length should not be zero.");
            return Err(())
        }
        let mut sheet = Self {
            tempo,
            total_length,
            notes: Vec::new()
        };

        let number_of_notes = content["number_of_notes"].as_usize().unwrap();

        for i in 0..number_of_notes {
            let note_data = &content["notes"][i];
            let start = Self::real::<usize>(note_data["start"].as_usize())?;
            let length = Self::real::<usize>(note_data["length"].as_usize())?;
            let pitch = Self::real::<usize>(note_data["pitch"].as_usize())?;
            let note_type = Self::real::<&str>(note_data["note_type"].as_str())?;
            sheet.notes.push(Note::new(
                start,
                length,
                pitch,
                NoteType::note_type(note_type),
            ))
        }

        Ok(sheet)
    }

    fn real<T>(value: Option<T>) -> Result<T, ()> {
        if let Some(value) = value {
            Ok(value)
        }
        else {
            Err(())
        }
    }

    /// Writes WAV file header based on chunk size.
    pub fn write_wav_header(&self, file: &mut File, chunk_size: usize) -> Result<(), ()> {
        let mut total_chunk_size = chunk_size * 4 + 36;
        let mut data_chunk_size = chunk_size * 4;
        let mut total_chunk_digits: Vec<u8> = vec![];
        let mut data_chunk_digits: Vec<u8> = vec![];

        for _ in 0..4 {
            total_chunk_digits.push((total_chunk_size % 256).try_into().unwrap());
            total_chunk_size /= 256;
            data_chunk_digits.push((data_chunk_size % 256).try_into().unwrap());
            data_chunk_size /= 256;
        }

        // HEADER for .wav file extension. Follow the comments..
        let header_buffer: [u8; 44] = [
            // 0~3: Indicates that it follows RIFF standard format. Has fixed value of 'RIFF'.
            0x52, 0x49, 0x46, 0x46, 
            // 4~7: Entire chunk size. In our case, data chunk size + 36.
            total_chunk_digits[0], total_chunk_digits[1], total_chunk_digits[2], total_chunk_digits[3],
            // 8~11: Indicates that it is WAVE file. Has fixed value of 'WAVE'.
            0x57, 0x41, 0x56, 0x45, 
            // 12~15: Indicates that 'fmt' chunk starts. Has fixed value of 'fmt '. (Beaware of blank at 4th position.)
            0x66, 0x6d, 0x74, 0x20,
            // 16~19: Size of 'fmt' chunk. We use 16.
            0x10, 0x00, 0x00, 0x00, 
            // 20~21: Compression code. Since it is uncompressed, we use 1.
            0x01, 0x00, 
            // 22~23: Number of channels. 2 for stereo, 1 for mono. We use 2.
            0x02, 0x00,
            // 24~27: Sample rate of audio. We use 44100. (44100Hz)
            0x44, 0xac, 0x00, 0x00, 
            // 28~31: Average bytes per seconds. 
            0x10, 0xb1, 0x02, 0x00,
            // 32~33: Block alignment. We use 4.
            0x04, 0x00, 
            // 34~35: Significant bits per sample. We use 16.
            0x10, 0x00, 
            // 36~39: Indicates that 'data' chunk starts. Has fixed value of 'data'.
            0x64, 0x61, 0x74, 0x61,
            // 40~43: Size of 'data' chunk.
            data_chunk_digits[0], data_chunk_digits[1], data_chunk_digits[2], data_chunk_digits[3]
            ];

        file.write_all(&header_buffer).or_else(|_| {return Err(())})?;
        
        Ok(())
    }

    /// Write wav data chunks to file.
    /// Interprets notes.
    /// It takes quite long time.
    fn write_wav_data(&self, file: &mut File, total_samples: usize) -> Result<(), ()> {
        let mut notes_alive: HashSet<Note> = HashSet::new();
        // let mut notes_releasing: HashSet<Note> = HashSet::new();
        // Current position in length.
        let mut current_position = 0;
        let chunks_per_length = total_samples / self.total_length;

        // For every sample, compute wave function and adsr function to get actual amplitude of sound.
        // TODO: Support filters.
        // TODO: Support sound of release.
        for i in 0..total_samples {
            if i % chunks_per_length == 0 {
                self.collect_notes_alive(&mut notes_alive, current_position);
                current_position += 1;
            }

            let mut payload: Vec<u8> = vec![];
            
            let mut amplitude = 65536;
            for note in notes_alive.iter() {
                let adsr_value = note.compute_adsr(chunks_per_length, i);
                let wave_value = note.compute_wave(5000, i);
                amplitude += (adsr_value * wave_value) as usize;
                amplitude %= 65536;
            }

            // Payload consists of 2 duplicate items, because currently we make stereo sounds.
            for _ in 0..2 {
                payload.push((amplitude % 256) as u8);
                payload.push((amplitude / 256) as u8);
            }
            
            file.write_all(&payload).or_else(|_| {return Err(())})?;
        }

        Ok(())
    }

    /// Collect notes alive at current position.
    fn collect_notes_alive(&self, notes_alive: &mut HashSet<Note>, current_position: usize) {
        // Remove notes no longer needed.
        let mut victims = HashSet::new();
        for alive_note in notes_alive.iter() {
            if alive_note.start + alive_note.length <= current_position {
                victims.insert(alive_note.clone());
            }
        }
        for victim in victims.iter() {
            notes_alive.remove(victim);
        }

        // Add notes 
        for note in self.notes.iter() {
            if note.start == current_position {
                notes_alive.insert(note.clone());
            }
        }
    }

    /// Create WAV file and put contents based on sheet data.
    pub fn create_wav(&self, file_name: &str) -> Result<(), ()> {
        let path_name = format!("./wavs/{}.wav", file_name);
        let path = Path::new(path_name.as_str());

        let mut file = match File::create(path) {
            Ok(file) => file,
            Err(error) => {
                eprintln!("Couldn't create file {}", path_name);
                eprintln!("{}", error);
                return Err(())
            }
        };

        // Chunk size is actual data size.
        let sample_rate = 44100;
        let chunk_size = 15.0 * (self.total_length as f64) / (self.tempo as f64) * (sample_rate as f64);
        let chunk_size = chunk_size as usize;

        if self.write_wav_header(&mut file, chunk_size).is_err() {
            eprintln!("Writing header data for WAV file failed.");
            return Err(())
        }

        if self.write_wav_data(&mut file, chunk_size).is_err() {
            eprintln!("Writing data chunks for WAV file failed.");
            return Err(())
        }


        Ok(())
    }
}



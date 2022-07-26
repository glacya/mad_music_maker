/// Computes sine wave value for current amplitude, frequency, and index.
pub fn wave_sine(amplitude: usize, frequency: f64, index: usize) -> usize {
    let pi = std::f64::consts::PI;
    (65536.0 + (amplitude as f64) * f64::sin(2.0 * pi * (index as f64) * frequency / 44100.0)) as usize
}

/// Computes sqaure wave value for current amplitude, frequency, and index.
pub fn wave_square(amplitude: usize, frequency: f64, index: usize) -> usize {
    let sample_per_period = (44100.0 / frequency) as usize;
    let threshold = (22050.0 / frequency) as usize;

    let amp = if (index % sample_per_period) <= threshold {
        65536.0 + (amplitude / 2) as f64
    }
    else {
        65536.0 - (amplitude / 2) as f64
    };
    amp as usize
}

/// Computes triangle wave value for current amplitude, frequency, and index.
pub fn wave_triangle(amplitude: usize, frequency: f64, index: usize) -> usize {
    let sample_per_period = (44100.0 / frequency) as usize;
    let threshold = (22050.0 / frequency) as usize;
    let periodic_index = index % sample_per_period;

    let amp = if periodic_index <= threshold {
        65536.0 + (2.0 * periodic_index as f64 / threshold as f64 - 1.0) * amplitude as f64
    }
    else {
        65536.0 + (-2.0 * periodic_index as f64 / threshold as f64 + 3.0) * amplitude as f64
    };
    amp as usize
}

/// Computes saw wave value for current amplitude, frequency, and index.
pub fn wave_saw(amplitude: usize, frequency: f64, index: usize) -> usize {
    let sample_per_period = (44100.0 / frequency) as usize;
    let periodic_index = index % sample_per_period;
    let amp = 65536.0 + (2.0 * periodic_index as f64 / sample_per_period as f64 - 1.0) * amplitude as f64;
    amp as usize
}
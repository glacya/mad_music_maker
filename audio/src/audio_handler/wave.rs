/// Computes overtone of sine function.
/// if overtone_multiplier is 1, it is equal to original sine wave.
fn sine_overtone(overtone_multiplier: usize, frequency: f64, index: usize) -> f64 {
    assert!(overtone_multiplier > 0);
    let pi = std::f64::consts::PI;
    f64::sin((overtone_multiplier as f64) * 2.0 * pi * (index as f64) * frequency / 44100.0)
}

/// Computes sine wave value for current amplitude, frequency, and index.
pub fn wave_sine(amplitude: usize, frequency: f64, index: usize) -> f64 {
    (amplitude as f64) * sine_overtone(1, frequency, index)
}

/// Computes sqaure wave value for current amplitude, frequency, and index.
pub fn wave_square(amplitude: usize, frequency: f64, index: usize) -> f64 {
    let sample_per_period = (44100.0 / frequency) as usize;
    let threshold = (22050.0 / frequency) as usize;

    if (index % sample_per_period) <= threshold {
        (amplitude / 2) as f64
    }
    else {
        (-(amplitude as isize) / 2) as f64
    }
}

/// Computes triangle wave value for current amplitude, frequency, and index.
pub fn wave_triangle(amplitude: usize, frequency: f64, index: usize) -> f64 {
    let sample_per_period = (44100.0 / frequency) as usize;
    let threshold = (22050.0 / frequency) as usize;
    let periodic_index = index % sample_per_period;

    if periodic_index <= threshold {
        (2.0 * periodic_index as f64 / threshold as f64 - 1.0) * amplitude as f64
    }
    else {
        (-2.0 * periodic_index as f64 / threshold as f64 + 3.0) * amplitude as f64
    }
}

/// Computes saw wave value for current amplitude, frequency, and index.
pub fn wave_saw(amplitude: usize, frequency: f64, index: usize) -> f64 {
    let sample_per_period = (44100.0 / frequency) as usize;
    let periodic_index = index % sample_per_period;
    (2.0 * periodic_index as f64 / sample_per_period as f64 - 1.0) * amplitude as f64
}

/// Computes Synth1 wave value for current amplitude, frequency, and index.
pub fn wave_synth1(amplitude: usize, frequency: f64, index: usize) -> f64 {
    let pi = std::f64::consts::PI;
    let ampf = amplitude as f64;
    let component1 = sine_overtone(1, frequency, index);
    // let component2 = f64::exp(-0.00004 * 2.0 * pi * (index as f64) * frequency / 44100.0);
    let component2 = 1.0;
    let mut amp = component1 * component2;
    amp += sine_overtone(2, frequency, index) * component2 / 2.0;
    amp += sine_overtone(3, frequency, index) * component2 / 4.0;
    amp += sine_overtone(4, frequency, index) * component2 / 8.0;
    amp += sine_overtone(5, frequency, index) * component2 / 16.0;
    amp += sine_overtone(6, frequency, index) * component2 / 32.0;
    amp = amp * amp * amp;
    amp * ampf
}
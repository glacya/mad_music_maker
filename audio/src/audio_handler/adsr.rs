/// ADSR function with linear velocity scaling.
/// It has following characteristics:
/// - A: very very short (1000 samples)
/// - D: slow (44100 samples until reaching sustain level)
/// - S: 0 (It should eventually decay to zero)
/// - R: short (10000 samples)
/// Note that index should be relative.
/// TODO: extend function domain to support release values.
pub fn adsr_full_linear(current_index: usize, start_index: usize) -> f64 {
    let relative_index = current_index - start_index;
    if relative_index < 1000 {
        // Attack Range
        (relative_index as f64) / 1000.0 
    }
    else {
        // Decay - Sustain Range
        let x = relative_index as f64;
        let decay_time = 44100.0;
        (decay_time + 1000.0 - x) / decay_time
    }
}

/// ADSR function with exponential velocity scaling.
/// However, in attack phase, it is linear.
pub fn adsr_full_exponential(current_index: usize, start_index: usize) -> f64 {
    let relative_index = current_index - start_index;
    if relative_index < 1000 {
        (relative_index as f64) / 1000.0
    }
    else {
        let exp_coeff = -0.00008;
        let x = relative_index as f64;
        f64::exp(exp_coeff * (x - 1000.0))
    }
}

/// ADSR function that always returns 1.0.
pub fn adsr_plain(_current_index: usize, _start_index: usize) -> f64 {
    1.0
}
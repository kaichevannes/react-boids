use std::ops::{Add, Div, Mul, Rem, Sub};

use wasm_bindgen::prelude::wasm_bindgen;

use crate::grid::Point;

#[derive(Clone, Debug, Copy)]
#[repr(C)]
#[wasm_bindgen]
pub struct Boid {
    pub position: Vec2,
    pub velocity: Vec2,
    pub acceleration: Vec2,
}

impl Point for Boid {
    fn xy(&self) -> (f32, f32) {
        (self.position.0, self.position.1)
    }
    fn set_xy(&mut self, x: f32, y: f32) {
        self.position = Vec2(x, y);
    }
}

#[derive(Clone, Debug, Copy, PartialEq)]
#[repr(C)]
#[wasm_bindgen]
pub struct Vec2(pub f32, pub f32);

impl Vec2 {
    pub fn magnitude(&self) -> f32 {
        (self.0.powi(2) + self.1.powi(2)).sqrt()
    }
}

impl From<(f32, f32)> for Vec2 {
    fn from(value: (f32, f32)) -> Self {
        Vec2(value.0, value.1)
    }
}

impl From<Vec2> for (f32, f32) {
    fn from(value: Vec2) -> Self {
        (value.0, value.1)
    }
}

impl Add for Vec2 {
    type Output = Vec2;
    fn add(self, rhs: Self) -> Self::Output {
        Vec2(self.0 + rhs.0, self.1 + rhs.1)
    }
}

impl Add<f32> for Vec2 {
    type Output = Vec2;
    fn add(self, rhs: f32) -> Self::Output {
        Vec2(self.0 + rhs, self.1 + rhs)
    }
}

impl Sub for Vec2 {
    type Output = Vec2;
    fn sub(self, rhs: Self) -> Self::Output {
        Vec2(self.0 - rhs.0, self.1 - rhs.1)
    }
}

impl Mul<f32> for Vec2 {
    type Output = Vec2;
    fn mul(self, rhs: f32) -> Self::Output {
        Vec2(self.0 * rhs, self.1 * rhs)
    }
}

impl Div<f32> for Vec2 {
    type Output = Vec2;
    fn div(self, rhs: f32) -> Self::Output {
        Vec2(self.0 / rhs, self.1 / rhs)
    }
}

impl Div<u32> for Vec2 {
    type Output = Vec2;
    fn div(self, rhs: u32) -> Self::Output {
        self / rhs as f32
    }
}

impl Div<usize> for Vec2 {
    type Output = Vec2;
    fn div(self, rhs: usize) -> Self::Output {
        self / rhs as f32
    }
}

impl Rem<f32> for Vec2 {
    type Output = Vec2;
    fn rem(self, rhs: f32) -> Self::Output {
        Vec2(self.0 % rhs, self.1 % rhs)
    }
}

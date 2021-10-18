// latest
import { h, render, createContext } from 'https://unpkg.com/preact@latest?module';
import { useContext, useState, useReducer } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';
import htm from 'https://unpkg.com/htm@latest/dist/htm.module.js?module';
const html = htm.bind(h);

export {
    render,
    html,
    createContext,
    useContext,
    useState,
    useReducer,
};

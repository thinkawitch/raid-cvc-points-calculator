// latest
const shouldLoadDT = new URLSearchParams(window.location.search).has('dev');
console.log('should load devtool?', shouldLoadDT);
if (shouldLoadDT) {
    await import('https://unpkg.com/preact@latest/devtools/dist/devtools.module.js?module');
}
import { h, render, createContext } from 'https://unpkg.com/preact@latest?module';
import { useContext, useState, useReducer, useEffect, useMemo, useCallback, useRef } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';
import htm from 'https://unpkg.com/htm@latest/dist/htm.module.js?module';
const html = htm.bind(h);

export {
    render,
    html,
    createContext,
    useContext,
    useState,
    useReducer,
    useEffect,
    useMemo,
    useCallback,
    useRef,
};

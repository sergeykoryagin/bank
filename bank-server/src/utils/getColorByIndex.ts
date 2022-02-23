import { inspect } from 'util';

const colors = [
    '#E20000',
    '#F59421',
    '#F5ED21',
    '#00FF66',
    '#00A3FF',
    '#0038FF',
    '#A400DE',
    '#004933',
    '#00FFE0',
    '#989898',
    '#000000',
    '#FF53C5',
    '#993C07',
    '#0E6E7B',
    '#6A0000',
    '#979100',
];

export const getColorByIndex = (index: number): string => {
    if (colors.length < index) {
        return colors[index % colors.length];
    }
    return colors[index];
};

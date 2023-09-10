import path from 'node:path';
import type { PageServerLoad } from './$types';
import dirTree, { type DirectoryTree } from 'directory-tree';

export interface Item {
    src: string;
    display: string;
    part: string;
}

function treePng(tree:DirectoryTree, callback: (arg0: DirectoryTree<Record<string, any>>) => void) {
    if (tree.name.endsWith('.png')) {
        callback(tree);
    }
    if (tree.children) {
        tree.children.forEach(child => treePng(child, callback))
    }
}

function displayName(filename: string): string {
    return filename.slice(0, -4).replaceAll('_', ' ');
}

export const load = (async () => {
    const basePath = path.resolve(
        path.dirname(new URL(import.meta.url).pathname), '../../static'
        );
    const tree = dirTree(path.resolve(basePath, 'parts'), {extensions: /\.png/});
    const items:Item[]=[];
    treePng(tree, leaf => {
        items.push({src: path.relative(basePath, leaf.path), display: displayName(leaf.name), part: path.basename(path.dirname(leaf.path))});
    });
    items.sort((a,b) => a.display.localeCompare(b.display));
    return {
        items
    };
}) satisfies PageServerLoad;
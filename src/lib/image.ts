import mergeImages from 'merge-images';

export function composeImage(selectedItems: Record<string, string>): Promise<string> {
    const baseImage = selectedItems.head ? '/parts/base/Naked_bald.png' : '/parts/base/Naked_set.png';
    const images = [baseImage];
    ['legs', 'body', 'head'].forEach(part => {
        if (selectedItems[part]) {
            images.push(selectedItems[part]);
        }
    });
    return mergeImages(images);
}
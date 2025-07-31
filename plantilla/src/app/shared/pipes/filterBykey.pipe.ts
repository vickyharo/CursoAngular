import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    standalone: true,
    name: 'filterByKey'
})
export class FilterByKey implements PipeTransform {
    transform(items: any[], searchText: string, keys: string[]): any[] {
        if (!items || !searchText || keys.length === 0) {
            return items;
        }

        const lowerSearch = searchText.toLowerCase();

        return items.filter(item =>
            keys.some(key => {
                const value = item[key];
                return value?.toString().toLowerCase().includes(lowerSearch);
            })
        );
    }
}

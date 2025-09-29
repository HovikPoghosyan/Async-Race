import { Winner } from 'store/modules/listReducer';

export type SortBy = 'By Wins' | 'By Time';
export type SortDirection = 'Increasing' | 'Decreasing';

function sortWinnersList(list: Winner[], by: SortBy, direction: SortDirection): Winner[] {
   const sortingBy = by === 'By Wins' ? 'wins' : 'time';
   const sortedList = [...list].sort((a, b) => a[sortingBy] - b[sortingBy]);

   return direction === 'Increasing' ? sortedList : sortedList.reverse();
}

export default sortWinnersList;

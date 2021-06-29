export function board_string_to_grid(board_string) {
  /* Convert a board string to a two-dimensional array
   */
  var rows = [];
  var cur_row = [];
  for (var i in board_string) {
    cur_row.push(board_string[i]);
    if (i % 9 === 8) {
      rows.push(cur_row);
      cur_row = [];
    }
  }
  return rows;
}

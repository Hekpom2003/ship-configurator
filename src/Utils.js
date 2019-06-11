class Utils {
  static transpose = matrix => matrix.reduce(($, row) =>
      row.map((_, i) => [...($[i] || []), row[i]]),
    []
  );
}

export default Utils;
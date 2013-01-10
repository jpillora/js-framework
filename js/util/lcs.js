define([], function() {
  
  /** 
   * Find a longest common subsenquence.
   *
   * Note: this is not necessarily the only possible longest common subsequence though!
   * http://forrst.com/posts/Longest_Common_Subsequence_in_JavaScript-mQB
   */
  function lcs(x, y) {
      return bt(
        lens(x, y),
        x, y, 
        x.length, y.length
      );
  }

  /**
   * Iteratively memoize a matrix of longest common subsequence lengths.
   */
  function lens(x, y) {
    var i, j,
        lenX = x.length,
        lenY = y.length;
    
    // Initialize a lenX+1 x lenY+1 matrix
    var m = [lenX+1];
    for (i = 0; i < lenX+1; i++) {
      m[i] = [lenY+1];
      for (j = 0; j < lenY+1; j++) {
        m[i][j] = 0;
      }
    }
      
    // Memoize the lcs length at each position in the matrix
    for (i = 1; i < lenX+1; i++)
      for (j = 1; j < lenY+1; j++)
          m[i][j] = (x[i-1] === y[j-1]) ?
            m[i-1][j-1] + 1 :
            Math.max(
              m[i][j-1],
              m[i-1][j]
            );
    
    return m;
  }

  /**
   * Recursively read back a memoized matrix of longest common subsequence lengths
   * to find a longest common subsequence.
   */
  function bt(m, x, y, px, py) {
    
    // base case
    if (px === 0 || py === 0)
      return [];
    else if (x [px-1] == y[py-1])
      return bt(m, x, y, px-1, py-1).concat([x[px-1]]);
    else if (m[px][py-1] > m[px-1][py]) 
      return bt(m, x, y, px, py-1);
    else
      return bt(m, x, y, px-1, py);
  }

  return lcs;
});
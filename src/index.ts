class CoverageTracker {
  private readonly trackedLines: Record<string, number> = {};
  private readonly trackedLineCounts: Record<string, number> = {};

  /**
   * Get the total coverage % as a value between 0 and 1.
   */
  public getCoverage(): number {
    let total = 0;
    let covered = 0;
    for (const [fileName, lineCount] of pairs(this.trackedLineCounts)) {
      total += lineCount;
      covered += this.trackedLines[fileName];
    }

    return covered / total;
  }

  /** @hidden */
  public track(fileName: string, line: number): void {
    this.trackedLines[fileName] ??= 0;
    this.trackedLines[fileName]++;
  }

  /** @hidden */
  public totalLines(fileName: string, lineCount: number): void {
    this.trackedLineCounts[fileName] = lineCount;
  }
}

const rcov = new CoverageTracker;
export = rcov;
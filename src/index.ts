class CoverageTracker {
  private readonly trackedLines: Record<string, Set<number>> = {};
  private readonly trackedLineCounts: Record<string, number> = {};

  /**
   * Get the total coverage % as a value between 0 and 1.
   */
  public getCoverage(): number {
    let total = 0;
    let covered = 0;
    for (const [fileName, lineCount] of pairs(this.trackedLineCounts)) {
      total += lineCount;
      covered += (this.trackedLines[fileName] ?? new Set).size();
    }

    if (covered === 0 && total === 0)
      return 0;

    return covered / total;
  }

  /** @hidden */
  public track(fileName: string, line: number): void {
    const tracked = this.trackedLines[fileName] ??= new Set;
    tracked.add(line);
  }

  /** @hidden */
  public totalLines(fileName: string, lineCount: number): void {
    this.trackedLineCounts[fileName] = lineCount;
  }
}

const rcov = new CoverageTracker;
export = rcov;
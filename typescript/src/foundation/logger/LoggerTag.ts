export enum LoggerTag {
    Error = "error",
    Info = "info",
}

export const DefaultLoggerTagSet: Set<LoggerTag> = new Set([LoggerTag.Info, LoggerTag.Error]);
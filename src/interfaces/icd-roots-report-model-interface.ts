import {IcdRootsReportFiltersModel} from "./icd-roots-report-filters-model-interface.ts";
import {IcdRootsReportRecordModel} from "./icd-roots-report-record-model-interface.ts";

export interface IcdRootsReportModel {
    filters?: IcdRootsReportFiltersModel;
    records?: IcdRootsReportRecordModel;
    summaryByRoot?: Record<string, number> | null;
}
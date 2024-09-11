<?php

namespace Rpj\Daterangepicker;

use Exception;
use Illuminate\Support\Carbon;

class DateHelper
{
    const ALL = 'All';

    const TODAY = 'Today';

    const YESTERDAY = 'Yesterday';

    const LAST_2_DAYS = 'Last 2 days';

    const LAST_7_DAYS = 'Last 7 days';

    const THIS_WEEK = 'This week';

    const LAST_WEEK = 'Last week';

    const LAST_30_DAYS = 'Last 30 days';

    const THIS_MONTH = 'This month';

    const LAST_MONTH = 'Last month';

    const LAST_6_MONTHS = 'Last 6 months';

    const THIS_YEAR = 'This year';

    const TIMEZONE = 'America/New_York';

    public static function defaultRanges(): array
    {
        return [
            self::TODAY => [Carbon::today()->timezone(self::TIMEZONE), Carbon::today()->timezone(self::TIMEZONE)],
            self::YESTERDAY => [Carbon::yesterday()->timezone(self::TIMEZONE), Carbon::yesterday()->timezone(self::TIMEZONE)],
            self::LAST_7_DAYS => [Carbon::today()->subDays(6)->timezone(self::TIMEZONE), Carbon::today()->timezone(self::TIMEZONE)],
            self::LAST_30_DAYS => [Carbon::today()->subDays(29)->timezone(self::TIMEZONE), Carbon::today()->timezone(self::TIMEZONE)],
            self::THIS_MONTH => [Carbon::today()->startOfMonth()->timezone(self::TIMEZONE), Carbon::today()->timezone(self::TIMEZONE)],
            self::LAST_MONTH => [Carbon::today()->subMonth()->startOfMonth()->timezone(self::TIMEZONE), Carbon::today()->subMonth()->endOfMonth()->timezone(self::TIMEZONE)],
            self::THIS_YEAR => [Carbon::today()->startOfYear()->timezone(self::TIMEZONE), Carbon::today()->timezone(self::TIMEZONE)],
        ];
    }

    public static function getParsedDatesGroupedRanges($value): array
    {
        if ($value == self::ALL) {
            return [null, null];
        }

        $start = Carbon::now()->timezone(self::TIMEZONE);
        $end = $start->clone()->timezone(self::TIMEZONE);

        switch ($value) {
            case self::TODAY:
                break;
            case self::YESTERDAY:
                $start->subDay(1)->timezone(self::TIMEZONE);
                $end = $start->clone()->timezone(self::TIMEZONE);
                break;
            case self::LAST_2_DAYS:
                $start->subDays(1)->timezone(self::TIMEZONE);
                break;
            case self::LAST_7_DAYS:
                $start->subDays(6)->timezone(self::TIMEZONE);
                break;
            case self::THIS_WEEK:
                $start->startOfWeek(Carbon::MONDAY)->timezone(self::TIMEZONE);
                break;
            case self::LAST_WEEK:
                $start->startOfWeek(Carbon::MONDAY)->subWeek(1)->timezone(self::TIMEZONE);
                $end = $start->clone()->endOfWeek(Carbon::SUNDAY)->timezone(self::TIMEZONE);
                break;
            case self::LAST_30_DAYS:
                $start->subDays(30)->timezone(self::TIMEZONE);
                break;
            case self::THIS_MONTH:
                $start->startOfMonth()->timezone(self::TIMEZONE);
                break;
            case self::LAST_MONTH:
                $start->startOfMonth()->subMonth()->timezone(self::TIMEZONE);
                $end = $start->clone()->endOfMonth()->timezone(self::TIMEZONE);
                break;
            case self::LAST_6_MONTHS:
                $start->subMonths(6)->timezone(self::TIMEZONE);
                break;
            case self::THIS_YEAR:
                $start->startOfYear()->timezone(self::TIMEZONE);
                break;
            default:
                $parsed = explode(' to ', $value);
                if (count($parsed) == 1) {
                    $start = Carbon::createFromFormat('Y-m-d', $value)->timezone(self::TIMEZONE);
                    $end = $start->clone()->timezone(self::TIMEZONE);
                } elseif (count($parsed) == 2) {
                    $start = Carbon::createFromFormat('Y-m-d', $parsed[0])->timezone(self::TIMEZONE);
                    $end = Carbon::createFromFormat('Y-m-d', $parsed[1])->timezone(self::TIMEZONE);
                } else {
                    throw new Exception('Date range picker: Date format incorrect.');
                }
        }

        return [
            $start->setTime(0, 0, 0)->timezone(self::TIMEZONE),
            $end->setTime(23, 59, 59)->timezone(self::TIMEZONE),
        ];
    }
}

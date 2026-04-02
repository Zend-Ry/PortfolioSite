const YEAR_MONTH_RE = /^\d{4}-\d{2}$/;
const YEAR_MONTH_DAY_RE = /^\d{4}-\d{2}-\d{2}$/;

function parseProjectDate(dateString: string): Date | null {
  if (YEAR_MONTH_DAY_RE.test(dateString)) {
	const [year, month, day] = dateString.split('-').map(Number);
	return new Date(year, month - 1, day);
  }

  if (YEAR_MONTH_RE.test(dateString)) {
	const [year, month] = dateString.split('-').map(Number);
	return new Date(year, month - 1, 1);
  }

  const parsed = new Date(dateString);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function formatProjectDateMonthYear(dateString: string): string {
  const date = parseProjectDate(dateString);
  if (!date) {
	return dateString;
  }

  return date.toLocaleDateString('en-US', {
	year: 'numeric',
	month: 'long',
  });
}

export function formatProjectDateDetail(dateString: string): string {
  const date = parseProjectDate(dateString);
  if (!date) {
	return dateString;
  }

  if (YEAR_MONTH_DAY_RE.test(dateString)) {
	return date.toLocaleDateString('en-US', {
	  year: 'numeric',
	  month: 'long',
	  day: 'numeric',
	});
  }

  return formatProjectDateMonthYear(dateString);
}


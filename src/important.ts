const temp = {
  periods: [
    {
      dateString: "2024-04",
      date: "2024-04-01T00:00:00.000Z",
      start_balance: 666084.96,
      project: [
        {
          id: 19,
          name: "super test",
          income_sum: 0,
          unspecified_incomes: 0,
          income_category_sum: 0,
          income_category: [
            {
              id: 792,
              name: "Credit",
              income: 0,
            },
            {
              id: 791,
              name: "Software",
              income: 0,
            },
            {
              id: 793,
              name: "Services",
              income: 0,
            },
            {
              id: 799,
              name: "regr",
              income: 0,
            },
            {
              id: 798,
              name: "nttt",
              income: 0,
            },
            {
              id: 794,
              name: "fixed_assets",
              income: 0,
            },
            {
              id: 795,
              name: "intangible_assets",
              income: 0,
            },
            {
              id: 796,
              name: "short_term",
              income: 0,
            },
            {
              id: 797,
              name: " long_term",
              income: 0,
            },
            {
              id: 786,
              name: "Office",
              income: 0,
            },
            {
              id: 787,
              name: "Bank",
              income: 0,
            },
            {
              id: 788,
              name: "Wage",
              income: 0,
            },
            {
              id: 789,
              name: "Advertising",
              income: 0,
            },
            {
              id: 790,
              name: "Tax",
              income: 0,
            },
          ],
          spend_sum: 0,
          unspecified_spends: 0,
          spend_category_sum: 0,
          spend_category: [
            {
              id: 792,
              name: "Credit",
              spend: 0,
            },
            {
              id: 791,
              name: "Software",
              spend: 0,
            },
            {
              id: 793,
              name: "Services",
              spend: 0,
            },
            {
              id: 799,
              name: "regr",
              spend: 0,
            },
            {
              id: 798,
              name: "nttt",
              spend: 0,
            },
            {
              id: 794,
              name: "fixed_assets",
              spend: 0,
            },
            {
              id: 795,
              name: "intangible_assets",
              spend: 0,
            },
            {
              id: 796,
              name: "short_term",
              spend: 0,
            },
            {
              id: 797,
              name: " long_term",
              spend: 0,
            },
            {
              id: 786,
              name: "Office",
              spend: 0,
            },
            {
              id: 787,
              name: "Bank",
              spend: 0,
            },
            {
              id: 788,
              name: "Wage",
              spend: 0,
            },
            {
              id: 789,
              name: "Advertising",
              spend: 0,
            },
            {
              id: 790,
              name: "Tax",
              spend: 0,
            },
          ],
          saldo: 0,
        },
      ],
      transfer_saldo: {},
      transfer_income: {},
      transfer_spend: {},
      saldo: 0,
      end_balance: 298431.04,
      endOfWeek: "2024-04-07T23:59:59.999Z",
    },
  ],
  transfer_sum_saldo: {},
  transfer_sum_income: {},
  transfer_sum_spend: {},
  saldo: 65322,
};

const transformData = (data: typeof temp) => ({
  ...data,
  periods: data.periods.map((period) => ({
    ...period,
    project: Object.fromEntries(
      period.project.map((proj) => [
        proj.id,
        {
          ...proj,
          income_category: Object.fromEntries(
            proj.income_category.map((cat) => [cat.id, cat]),
          ),
          spend_category: Object.fromEntries(
            proj.spend_category.map((cat) => [cat.id, cat]),
          ),
        },
      ]),
    ),
  })),
});

// Usage
const transformedTemp = transformData(temp);

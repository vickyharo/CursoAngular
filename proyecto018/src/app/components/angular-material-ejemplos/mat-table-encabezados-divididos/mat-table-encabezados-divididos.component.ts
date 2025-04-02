import { Component } from '@angular/core';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  symbol2: string;
}

const ELEMENT_DATA: any[] = [
  {
    code: "abc",
    cadTrade: {
      total: "111",
      amount: "pay 111"
    },
    data2: {
      total: "112",
      amount: "pay 112"
    },
    data3: {
      total: "113",
      amount: "pay 113"
    },
    data4: {
      total: "114",
      amount: "pay 114"
    }
  },
  {
    code: "cde",
    cadTrade: {
      total: "551",
      amount: "pay 221"
    },
    data2: {
      total: "411",
      amount: "pay 331"
    },
    data3: {
      total: "311",
      amount: "pay 441"
    },
    data4: {
      total: "211",
      amount: "pay 551"
    }
  },
  {
    code: "cde",
    cadTrade: {
      total: "551",
      amount: "pay 221"
    },
    data2: {
      total: "411",
      amount: "pay 331"
    },
    data3: {
      total: "311",
      amount: "pay 441"
    },
    data4: {
      total: "211",
      amount: "pay 551"
    }
  },
  {
    code: "cde",
    cadTrade: {
      total: "551",
      amount: "pay 221"
    },
    data2: {
      total: "411",
      amount: "pay 331"
    },
    data3: {
      total: "311",
      amount: "pay 441"
    },
    data4: {
      total: "211",
      amount: "pay 551"
    }
  },
  {
    code: "cde",
    cadTrade: {
      total: "551",
      amount: "pay 221"
    },
    data2: {
      total: "411",
      amount: "pay 331"
    },
    data3: {
      total: "311",
      amount: "pay 441"
    },
    data4: {
      total: "211",
      amount: "pay 551"
    }
  },
  {
    code: "cde",
    cadTrade: {
      total: "551",
      amount: "pay 221"
    },
    data2: {
      total: "411",
      amount: "pay 331"
    },
    data3: {
      total: "311",
      amount: "pay 441"
    },
    data4: {
      total: "211",
      amount: "pay 551"
    }
  },
  {
    code: "cde",
    cadTrade: {
      total: "551",
      amount: "pay 221"
    },
    data2: {
      total: "411",
      amount: "pay 331"
    },
    data3: {
      total: "311",
      amount: "pay 441"
    },
    data4: {
      total: "211",
      amount: "pay 551"
    }
  },
  {
    code: "cde",
    cadTrade: {
      total: "551",
      amount: "pay 221"
    },
    data2: {
      total: "411",
      amount: "pay 331"
    },
    data3: {
      total: "311",
      amount: "pay 441"
    },
    data4: {
      total: "211",
      amount: "pay 551"
    }
  },
  {
    code: "cde",
    cadTrade: {
      total: "551",
      amount: "pay 221"
    },
    data2: {
      total: "411",
      amount: "pay 331"
    },
    data3: {
      total: "311",
      amount: "pay 441"
    },
    data4: {
      total: "211",
      amount: "pay 551"
    }
  },
  {
    code: "cde",
    cadTrade: {
      total: "551",
      amount: "pay 221"
    },
    data2: {
      total: "411",
      amount: "pay 331"
    },
    data3: {
      total: "311",
      amount: "pay 441"
    },
    data4: {
      total: "211",
      amount: "pay 551"
    }
  },
  {
    code: "cde",
    cadTrade: {
      total: "551",
      amount: "pay 221"
    },
    data2: {
      total: "411",
      amount: "pay 331"
    },
    data3: {
      total: "311",
      amount: "pay 441"
    },
    data4: {
      total: "211",
      amount: "pay 551"
    }
  },
  {
    code: "cde",
    cadTrade: {
      total: "551",
      amount: "pay 221"
    },
    data2: {
      total: "411",
      amount: "pay 331"
    },
    data3: {
      total: "311",
      amount: "pay 441"
    },
    data4: {
      total: "211",
      amount: "pay 551"
    }
  }
];

let newData = {
  data: {
    code: "ALL",
    summary: [
      {
        code: "12",
        data: [
          {
            group: "Trade",
            currency: "CAD", //group1
            amount: "$3,443.00",
            total: 1
          },
          {
            group: "Trade",
            currency: "USD", //group2
            amount: "$0.00",
            total: 0
          },
          {
            group: "Commission",
            currency: "CAD", //group3
            amount: "$0.00",
            total: 0
          },
          {
            group: "Commission",
            currency: "USD", //group4
            amount: "$0.00",
            total: 0
          }
        ]
      },
      {
        code: "34",
        data: [
          {
            group: "Trade",
            currency: "CAD", //group1
            amount: "$3,443.00",
            total: 1
          },
          {
            group: "Trade",
            currency: "USD", //group2
            amount: "$0.00",
            total: 0
          },
          {
            group: "Commission",
            currency: "CAD", //group3
            amount: "$0.00",
            total: 0
          },
          {
            group: "Commission",
            currency: "USD", //group4
            amount: "$0.00",
            total: 0
          }
        ]
      },
      {
        code: "34",
        data: [
          {
            group: "Trade",
            currency: "CAD", //group1
            amount: "$3,443.00",
            total: 1
          },
          {
            group: "Trade",
            currency: "USD", //group2
            amount: "$0.00",
            total: 0
          },
          {
            group: "Commission",
            currency: "CAD", //group3
            amount: "$0.00",
            total: 0
          },
          {
            group: "Commission",
            currency: "USD", //group4
            amount: "$0.00",
            total: 0
          }
        ]
      },
      {
        code: "34",
        data: [
          {
            group: "Trade",
            currency: "CAD", //group1
            amount: "$3,443.00",
            total: 1
          },
          {
            group: "Trade",
            currency: "USD", //group2
            amount: "$0.00",
            total: 0
          },
          {
            group: "Commission",
            currency: "CAD", //group3
            amount: "$0.00",
            total: 0
          },
          {
            group: "Commission",
            currency: "USD", //group4
            amount: "$0.00",
            total: 0
          }
        ]
      },
      {
        code: "34",
        data: [
          {
            group: "Trade",
            currency: "CAD", //group1
            amount: "$3,443.00",
            total: 1
          },
          {
            group: "Trade",
            currency: "USD", //group2
            amount: "$0.00",
            total: 0
          },
          {
            group: "Commission",
            currency: "CAD", //group3
            amount: "$0.00",
            total: 0
          },
          {
            group: "Commission",
            currency: "USD", //group4
            amount: "$0.00",
            total: 0
          }
        ]
      },
      {
        code: "34",
        data: [
          {
            group: "Trade",
            currency: "CAD", //group1
            amount: "$3,443.00",
            total: 1
          },
          {
            group: "Trade",
            currency: "USD", //group2
            amount: "$0.00",
            total: 0
          },
          {
            group: "Commission",
            currency: "CAD", //group3
            amount: "$0.00",
            total: 0
          },
          {
            group: "Commission",
            currency: "USD", //group4
            amount: "$0.00",
            total: 0
          }
        ]
      },
      {
        code: "34",
        data: [
          {
            group: "Trade",
            currency: "CAD", //group1
            amount: "$3,443.00",
            total: 1
          },
          {
            group: "Trade",
            currency: "USD", //group2
            amount: "$0.00",
            total: 0
          },
          {
            group: "Commission",
            currency: "CAD", //group3
            amount: "$0.00",
            total: 0
          },
          {
            group: "Commission",
            currency: "USD", //group4
            amount: "$0.00",
            total: 0
          }
        ]
      },
      {
        code: "34",
        data: [
          {
            group: "Trade",
            currency: "CAD", //group1
            amount: "$3,443.00",
            total: 1
          },
          {
            group: "Trade",
            currency: "USD", //group2
            amount: "$0.00",
            total: 0
          },
          {
            group: "Commission",
            currency: "CAD", //group3
            amount: "$0.00",
            total: 0
          },
          {
            group: "Commission",
            currency: "USD", //group4
            amount: "$0.00",
            total: 0
          }
        ]
      },
      {
        code: "34",
        data: [
          {
            group: "Trade",
            currency: "CAD", //group1
            amount: "$3,443.00",
            total: 1
          },
          {
            group: "Trade",
            currency: "USD", //group2
            amount: "$0.00",
            total: 0
          },
          {
            group: "Commission",
            currency: "CAD", //group3
            amount: "$0.00",
            total: 0
          },
          {
            group: "Commission",
            currency: "USD", //group4
            amount: "$0.00",
            total: 0
          }
        ]
      },
      {
        code: "34",
        data: [
          {
            group: "Trade",
            currency: "CAD", //group1
            amount: "$3,443.00",
            total: 1
          },
          {
            group: "Trade",
            currency: "USD", //group2
            amount: "$0.00",
            total: 0
          },
          {
            group: "Commission",
            currency: "CAD", //group3
            amount: "$0.00",
            total: 0
          },
          {
            group: "Commission",
            currency: "USD", //group4
            amount: "$0.00",
            total: 0
          }
        ]
      }
    ]
  }
};


@Component({
  selector: 'app-mat-table-encabezados-divididos',
  standalone: false,
  templateUrl: './mat-table-encabezados-divididos.component.html',
  styleUrl: './mat-table-encabezados-divididos.component.css'
})
export class MatTableEncabezadosDivididosComponent {
  displayedColumns: string[] = [
    "code",
    "cadTrade.total",
    "cadTrade.amount",
    "data2.total",
    "data2.amount",
    "data3.total",
    "data3.amount",
    "data4.total",
    "data4.amount"
  ];

  displayedColumns1: string[] = ["code", "data.data.group"];
  dataSource1 = ELEMENT_DATA;
}


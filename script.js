//DB

const turmas = [
  {
    turma: "Hipátia",
    curso: "Javascript",
    inicio: "30/11/2022",
    termino: "30/01/2023",
    nAlunos: 150,
    periodo: "noturno",
    concluida: false,
  },
  {
    turma: "Sibyla",
    curso: "Javascript",
    inicio: "30/10/2022",
    termino: "30/12/2022",
    nAlunos: 200,
    periodo: "integral",
    concluida: false,
  },
  {
    turma: "Curie",
    curso: "HTML e CSS",
    inicio: "15/09/2022",
    termino: "15/10/2022",
    nAlunos: 180,
    periodo: "noturno",
    concluida: true,
  },
  {
    turma: "Zhenyi",
    curso: "HTML e CSS",
    inicio: "01/11/2022",
    termino: "01/01/2023",
    nAlunos: 80,
    periodo: "integral",
    concluida: false,
  },
  {
    turma: "Clarke",
    curso: "HTML e CSS",
    inicio: "04/07/2022",
    termino: "04/09/2022",
    nAlunos: 200,
    periodo: "noturno",
    concluida: true,
  },
  {
    turma: "Blackwell",
    curso: "APIsRest",
    inicio: "20/03/2022",
    termino: "20/06/2022",
    nAlunos: 100,
    periodo: "integral",
    concluida: true,
  },
  {
    turma: "Elion",
    curso: "APIsRest",
    inicio: "12/01/2022",
    termino: "12/06/2022",
    nAlunos: 200,
    periodo: "noturno",
    concluida: true,
  },
  {
    turma: "Burnell",
    curso: "APIsRest",
    inicio: "18/10/2022",
    termino: "18/04/2023",
    nAlunos: 90,
    periodo: "integral",
    concluida: false,
  },
];

const cursos = [
  {
    curso: "HTML e CSS",
    descricao: "Desc temporario HTML e CSS",
    duracao: "1 mês",
    valor: 500,
  },
  {
    curso: "Javascript",
    descricao: "Desc temporario Javascript",
    duracao: "2 meses",
    valor: 900,
  },
  {
    curso: "APIsRest",
    descricao: "Desc temporario APIsRest",
    duracao: "6 meses",
    valor: 2000,
  },
];

const estudantes = [
  {
    estudante: "Chris Evans",
    turma: "Hipátia",
    curso: "Javascript",
    valor: "R$900,00",
    nParcelas: 9,
    desconto: false,
    parcelas: 100,
  },
  {
    estudante: "Halle Berry",
    turma: "Burnell",
    curso: "APIsRest",
    valor: "R$2.000,00",
    nParcelas: 4,
    desconto: false,
    parcelas: 500,
  },
  {
    estudante: "Lashana Lynch",
    turma: "Zhenyi",
    curso: "APIsRest",
    valor: "R$900,00",
    nParcelas: 1,
    desconto: true,
    parcelas: 900,
  },
];

//Calculadora

let carrinhoCursos = [];

function addCarrinho() {
  let parcela = +document.getElementById("installments").value;
  let checks = document.getElementsByName("curso");
  for (let i = 0; i < checks.length; i++) {
    if (checks[i].checked) {
      carrinhoCursos.push(+checks[i].value);
    }
  }
  calculaDesconto(parcela);
}

function calculaDesconto(parcela) {
  let descExtra = 0;
  let descPar = 0;
  let carrinho = carrinhoCursos.length;
  switch (carrinho) {
    case (carrinho = 3):
      descExtra = 0.15;
      break;
    case (carrinho = 2):
      descExtra = 0.1;
      break;
    case carrinho <= 1:
      descExtra = 0;
      break;
  }
  if (parcela <= 2) {
    descPar = 0.2;
  } else {
    descPar = 0;
  }
  let totalDisc = (descExtra + descPar).toFixed(2);
  let sum = carrinhoCursos.reduce((partialSum, a) => partialSum + a, 0);
  console.log(sum);
  let discountedPrice = sum - sum * totalDisc;
  console.log(discountedPrice);
  let display = document.getElementById("reportPrice");
  let content = `
  <p>Desconto de ${totalDisc * 100}%.</p> 
  <p>Parcelado em ${parcela}X de R$${(
    discountedPrice / parcela
  ).toFixed(2)}</p>`;
  display.innerHTML = content;
}

//Funções

buscarCurso = function (nomeCurso) {
  if (nomeCurso == "*") {
    return cursos;
  } else {
    let filtroCurso = cursos.filter(
      (x) => x.curso.toLowerCase() == nomeCurso.toLowerCase()
    );
    let erro = 0;
    return filtroCurso.length > 0 ? filtroCurso : erro;
  }
};

buscarTurma = function (nomeTurma) {
  if (nomeTurma == "*") {
    return turmas;
  } else {
    let filtroTurma = turmas.filter(
      (x) => x.turma.toLowerCase() == nomeTurma.toLowerCase()
    );
    let erro = 0;
    return filtroTurma.length > 0 ? filtroTurma : erro;
  }
};

buscarEstudante = function (nomeEstudante) {
  if (nomeEstudante == "*") {
    return estudantes;
  } else {
    let filtroEstudante = estudantes.filter((x) =>
      x.estudante.toLowerCase().includes(nomeEstudante.toLowerCase())
    );
    let erro = 0;
    return filtroEstudante.length > 0 ? filtroEstudante : erro;
  }
};

function relatorioEstudante(nomeEstudante) {
  let e = buscarEstudante(nomeEstudante)[0];
  return `Aluno: ${e.estudante}\nTurma: ${e.turma}\nCurso: ${e.curso}\nValor Total: R$${e.valor}\nValor Parcela: R$${e.parcelas}\nNº Parcelas: ${e.nParcelas}`;
}

function matricular(estudanteInput, cursoInput, turmaInput, nParcelasInput) {
  estudantes.push({
    estudante: estudanteInput,
    curso: cursoInput,
    turma: turmaInput,
    nParcelas: nParcelasInput,
  });
  return console.log(
    `Aluno Matriculado! \nNome: ${estudanteInput} \nCurso: ${cursoInput} \nTurma: ${turmaInput}`
  );
}

// DOM MANIPULATION

// Turmas

function btnSearch() {
  let value = document.getElementById("fieldSearch").value;
  criaCards(value);
}

contentCard = function (nomeTurma) {
  const turma = buscarTurma(nomeTurma);
  if (turma === 0) {
    alert("Turma não encontrada!");
  } else {
    cardTurma = "";
    for (let i = 0; i < turma.length; i++) {
      const x = turma[i];
      cardTurma += `
      <div class="class">
      <h4>${x.turma}</h4>
      <ol>
      <li><b>Curso:</b> ${x.curso}</li>
      <li><b>Início:</b> ${x.inicio}</li>
      <li><b>Término:</b> ${x.termino}</li>
      <li><b>Número de alunos:</b> ${x.nAlunos}</li>
      <li><b>Período:</b> ${x.periodo}</li>
      <li><b>Concluído:</b> ${(x.concluida = false ? "Não" : "Sim")}</li>
      </ol>
      </div>`;
    }
    return cardTurma;
  }
};

criaCards = function (nome) {
  let content = contentCard(nome);
  if (content) {
    let display = document.getElementById("displayClasses");
    display.innerHTML = content;
  } else {
  }
};

// Matriculas

populaDrop = function () {
  let turmas = buscarTurma("*");
  let cursos = buscarCurso("*");
  for (let i = 0; i < turmas.length; i++) {
    const x = turmas[i];
    dropTurma.options.add(new Option(x.turma, x.turma));
  }
  for (let i = 0; i < cursos.length; i++) {
    const x = cursos[i];
    dropCurso.options.add(new Option(x.curso, x.curso));
  }
};

contentReg = function () {
  estudanteInput = document.getElementById("studName").value;
  cursoInput = document.getElementById("dropCurso").value;
  turmaInput = document.getElementById("dropTurma").value;
  nParcelasInput = document.getElementById("install").value;
  matricular(estudanteInput, cursoInput, turmaInput, nParcelasInput);
  let content = `
  <img src="./public/img/check.png">
  <h4>Aluno Matrículado</h4>
  <p>Nome: ${estudanteInput}</p>
  <p>Curso: ${cursoInput}</p>
  <p>Turma: ${turmaInput}</p>`;
  let report = document.getElementById("report");
  report.innerHTML = content;
};

// Financeiro

contentStud = function (nomeStud) {
  const stud = buscarEstudante(nomeStud);
  if (stud === 0) {
    alert("Estudante não encontrade!");
  } else {
    cardStud = "";
    for (let i = 0; i < stud.length; i++) {
      const x = stud[i];
      cardStud += `
      <ol>
      <li><b>Nome:</b> ${x.estudante}</li>
      <li><b>Turma:</b> ${x.turma}</li>
      <li><b>Curso:</b> ${x.curso}</li>
      <li><b>Valor total:</b> ${x.valor}</li>
      <li><b>Valor parcela:</b> R$${(
        x.valor.replace(/\D/g, "") /
        100 /
        x.nParcelas
      ).toLocaleString("pt-BR")}</li>
      <li><b>Número de Parcelas:</b> ${x.nParcelas}</li>
      </ol>`;
    }
    return cardStud;
  }
};

criaReport = function () {
  let nome = document.getElementById("dropStud").value;
  let content = contentStud(nome);
  if (content) {
    let display = document.getElementById("studs");
    display.innerHTML = content;
  } else {
  }
};

populaClass = function () {
  let cursos = buscarCurso("*");
  let display = document.getElementById("chkCurso");
  let content = "";
  for (let i = 0; i < cursos.length; i++) {
    const x = cursos[i];
    content += `
      <label>${x.curso} 
      <input name="curso" type="checkbox" value="${x.valor}"/>
      </label>
    `;
  }
  display.innerHTML = content;
};

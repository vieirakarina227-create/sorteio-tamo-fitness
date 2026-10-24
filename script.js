
const SUPABASE_URL = "https://gfdkpjupuaqntuvpvlye.supabase.co";
const SUPABASE_KEY = "sb_publishable_EyIt_DQwim5WZyWJqA7jmQ_1QJ_ay0Z";

const botao = document.getElementById("botaoSortear");
const resultado = document.getElementById("resultado");
const nomePremio = document.getElementById("nomePremio");

let jaSorteou = false;

botao.addEventListener("click", async () => {
  if (jaSorteou) return;

  jaSorteou = true;
  botao.disabled = true;
  botao.innerHTML = "SORTEANDO...";

  try {
    const resposta = await fetch(
      `${SUPABASE_URL}/rest/v1/rpc/sortear_premio`,
      {
        method: "POST",
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          "Content-Type": "application/json"
        },
        body: "{}"
      }
    );

    if (!resposta.ok) {
      throw new Error("Falha ao sortear");
    }

    const dados = await resposta.json();

    if (!dados || dados.length === 0) {
      nomePremio.textContent =
        "Todos os prêmios já foram sorteados!";
    } else {
      nomePremio.textContent = dados[0].nome;
    }

    resultado.hidden = false;
    botao.innerHTML = "SORTEIO REALIZADO";

  } catch (erro) {
    jaSorteou = false;
    botao.disabled = false;
    botao.innerHTML =
      'CLIQUE AQUI <span>PARA SORTEAR</span>';

    alert(
      "Não foi possível realizar o sorteio. Confira a conexão e tente novamente."
    );
  }
});

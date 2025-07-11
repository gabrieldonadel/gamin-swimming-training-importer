# Swim2Garmin

[![Versão para Chrome](https://img.shields.io/badge/Disponível%20para-Chrome-green.svg?logo=google-chrome)](https://chromewebstore.google.com/detail/swim2garmin/oomnbdnhjjpjngonaneamhkmlpnjlcnk)
[![Versão para Firefox](https://img.shields.io/badge/Disponível%20para-Firefox-orange.svg?logo=firefox-browser)](https://addons.mozilla.org/en-US/firefox/addon/swim2garmin/)
[![Licença: MIT](https://img.shields.io/badge/Licença-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

O **Swim2Garmin** é uma extensão para navegador que facilita nadadores importam seus treinos do TrainingPeaks para o Garmin Connect. Esqueça a complexidade de montar treinos passo a passo na interface da Garmin. Com o Swim2Garmin, você pode escrever seu treino em linguagem natural, e a extensão faz o resto, importando-o diretamente para sua conta.

![Demonstração do Swim2Garmin](https://i.imgur.com/url.gif)

## ✨ Funcionalidades

- **Importação Rápida:** Copie e cole seu treino de natação em texto e importe-o com um único clique.
- **Linguagem Natural:** Escreva seus treinos de forma intuitiva, como "4x100m livre com 20s de descanso".
- **Visualização Prévia:** Visualize como seu treino será estruturado no Garmin Connect antes de importar.
- **Suporte a Repetições:** Crie séries complexas com repetições, distâncias e descansos variados.
- **Código Aberto:** Contribua para o desenvolvimento e ajude a melhorar a ferramenta.

## 🚀 Instalação

### Google Chrome

1.  Acesse a [Chrome Web Store](https://chromewebstore.google.com/detail/swim2garmin/oomnbdnhjjpjngonaneamhkmlpnjlcnk).
2.  Clique em "Adicionar ao Chrome".
3.  Acesse o [Garmin Connect](https://connect.garmin.com/) e importe o seu treino!

### Mozilla Firefox

1.  Acesse o [Firefox Browser ADD-ONS](https://addons.mozilla.org/en-US/firefox/addon/swim2garmin/).
2.  Clique em "Adicionar ao Firefox".
3.  Acesse o [Garmin Connect](https://connect.garmin.com/) e importe o seu treino!

## 🏊‍♀️ Como Usar

1.  **Acesse o Garmin Connect:** Navegue até a seção de treinos de natação no Garmin Connect.
2.  **Abra a Extensão:** Clique no ícone do Swim2Garmin na barra de ferramentas do seu navegador.
3.  **Cole seu Treino:** Cole o seu treino, escrito em linguagem natural, na caixa de texto.
4.  **Visualize (Opcional):** Clique em "Preview" para ver como o treino será estruturado.
5.  **Importe:** Clique em "Importar Treino" e a extensão fará a mágica!

### Formato do Treino

Use o seguinte formato para escrever seus treinos:

```
200m A1 (75m crawl, 25m costas) com 30"
6x50m (1 palmateio, 1 ondulação braçada unilateral, 1 perna costas) com 15"
150m A1 crawl segurando palmar com 20"
4x25m A3 crawl palmar pé-pato pqp P com 45"
50m A1 livre com 30"
```

**Estrutura da Linha:**

`<repetições>x<distância>m <descrição> com <descanso>"`

- **`<repetições>x` (Opcional):** Número de vezes que a série se repete.
- **`<distância>m` (Obrigatório):** A distância em metros.
- **`<descrição>` (Obrigatório):** A descrição do exercício.
- **`com <descanso>"` (Opcional):** O tempo de descanso em segundos.

## 👨‍💻 Para Desenvolvedores

Contribuições são muito bem-vindas! Se você deseja melhorar o Swim2Garmin, siga os passos abaixo.

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)

### Configuração do Ambiente

1.  **Clone o Repositório:**

    ```bash
    git clone https://github.com/your-username/swim2garmin.git
    cd swim2garmin
    ```

2.  **Instale as Dependências:**
    ```bash
    npm install
    ```

### Scripts Disponíveis

- **`npm dev`:** Inicia o ambiente de desenvolvimento com hot-reloading para o Chrome.
- **`npm build`:** Gera a versão de produção da extensão para o Chrome.
- **`npm build:firefox`:** Gera a versão de produção da extensão para o Firefox.

### Como Contribuir

1.  Crie um fork do projeto.
2.  Crie uma nova branch (`git checkout -b feature/sua-feature`).
3.  Faça suas alterações e commit (`git commit -m 'Adiciona nova feature'`).
4.  Envie para a sua branch (`git push origin feature/sua-feature`).
5.  Abra um Pull Request.

## 📄 Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

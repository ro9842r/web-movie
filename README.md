# Movie App

Uma aplicação web para organizar, visualizar e gerenciar listas personalizadas de filmes.

## Funcionalidades

- Autenticação de usuário (login/logout)
- Criação, visualização e remoção de listas de filmes
- Adição e remoção de filmes em listas
- Visualização de detalhes de cada lista
- Interface moderna e responsiva com PrimeNG e TailwindCSS

## Tecnologias Utilizadas

- Angular standalone components
- PrimeNG
- TailwindCSS
- RxJS Signals
- API RESTful (backend externo)

## Como rodar o projeto

1. **Instale as dependências:**
   ```bash
   npm install
   ```
2. **Configure o ambiente:**
   - Edite o arquivo `src/environments/environment.ts` e defina a URL da sua API:
     ```typescript
     export const environment = {
       apiUrl: "http://sua-api-url.com",
     };
     ```
3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm start
   ```
4. **Acesse no navegador:**
   - http://localhost:4200

## Scripts úteis

- `npm start` — inicia o app em modo desenvolvimento
- `npm test` — executa os testes unitários

## Estrutura de Pastas

- `src/app/pages/` — páginas principais (login, dashboard, listas)
- `src/app/components/` — componentes reutilizáveis
- `src/app/services/` — serviços de acesso à API
- `src/app/core/guards/` — guards de rota (AuthGuard, PublicGuard)
- `src/app/core/models/` — interfaces e tipos

## Testes

Os guards e serviços possuem testes unitários em `src/app/core/guards/*.spec.ts` e `src/app/services/*.spec.ts`.

## Contribuição

Pull requests são bem-vindos! Abra uma issue para discutir melhorias ou bugs.

## Licença

MIT

# WebMovie

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

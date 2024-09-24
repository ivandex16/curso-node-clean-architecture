import { envs } from './config/envs';
import { Server } from './presentation/server';
import { AppRotes } from './presentation/routes';




(async()=> {
  main();
})();


function main() {

  const server = new Server({
    port: envs.PORT,
    public_path: envs.PUBLIC_PATH,
    routes: AppRotes.routes,
  });

  server.start();
}
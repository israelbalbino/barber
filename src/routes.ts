import express,{ Router, Request, Response } from 'express';
import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailsUserController } from './controllers/user/DetailsUserController';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { UpdateUserController } from './controllers/user/UpdateUserController';
import { CreateHaircutController } from './controllers/haircut/CreateHaircutController';
import { ListHaircutController } from './controllers/haircut/ListHaircutController';
import { UpdateHaircutController } from './controllers/haircut/UpdateHaircutController';
import { CheckSubscriptionController } from './controllers/haircut/CheckSubscriptionController';
import { CountHaircutsController } from './controllers/haircut/CountHaircutsController';
import { DetailsHaircutsController } from './controllers/haircut/DetailsHaircutController';
import { NewScheduleController } from './controllers/shedule/NewSheduleController';
import { ListScheduleController } from './controllers/shedule/ListSheduleController';
import { ListUserController } from './controllers/user/ListUserController';

import { ListServiceController } from './controllers/shedule/ListServiceController';
import { FishSheduleController } from './controllers/shedule/FishSheduleController';
import { SubscriberController } from './controllers/subscription/SubscriberController';
import { WebhooksController } from './controllers/subscription/WebhooksController';
import { CreatePortalController } from './controllers/subscription/CreatePortalController';
import { CountController } from './controllers/shedule/CountController';
import { CountService } from './services/shedule/CountService';
import { TotalServiceController } from './controllers/shedule/TotalServiceController';
import { DataAtualController } from './controllers/shedule/DataAtualController';
import { TotalMesController } from './controllers/shedule/TotalMesController';
import { CountMesController } from './controllers/shedule/CountMesController';
import { GenerateReportController } from './controllers/user/GenerateReportController';
import { ListClientController } from './controllers/haircut/listClientController';
import { NewClientController } from './controllers/shedule/NewClientController';
import { UsersServiceController } from './controllers/shedule/UsersServiceController';
import { FishBtnEspController } from './controllers/shedule/FishBtnEspController';



const router = Router();


//----ROTAS USUARIOS--//

//cadastrar usuarios
router.post('/users', new CreateUserController().handle)
//logar usuario
router.post('/session', new AuthUserController().handle)
//datalhes do usuario
router.get('/me', isAuthenticated, new DetailsUserController().handle)
//atualizar dados usuario
router.put('/update', isAuthenticated, new UpdateUserController().handle)

//lista a aquantidade de serviços feito

router.get('/service/count', isAuthenticated, new CountController().handle)


//--ROTAS USUARIOS APP
//lista todos os usarios do sistema -- pra o aplicativo
router.get('/list/users',isAuthenticated, new ListUserController().handle)

//lista somente os serviços de acordo com o user_id do usuario
router.get('/list/user',isAuthenticated, new ListServiceController().handle)







//----ROTAS HAIRCUT--//

//cadastrar modelos de cortes
router.post('/haircut',isAuthenticated, new CreateHaircutController().handle)
router.get('/haircuts', isAuthenticated, new ListHaircutController().handle)
router.put('/haircut', isAuthenticated, new UpdateHaircutController().handle)
router.get('/haircut/check', isAuthenticated, new CheckSubscriptionController().handle)
router.get('/haircut/count',isAuthenticated, new CountHaircutsController().handle)
router.get('/haircut/details', isAuthenticated, new DetailsHaircutsController().handle)


router.get('/haircut/client', isAuthenticated, new ListClientController().handle)


router.post('/haircut/client/service', isAuthenticated, new NewClientController().handle)

//rota exibie a quantidade de serviços na barbearia
router.get('users/service', isAuthenticated, new UsersServiceController().handle)



//----ROTAS SERVIÇOS OU SHEDULE--//

router.post('/service', isAuthenticated, new NewScheduleController().handle)

router.get('/service', isAuthenticated, new ListScheduleController().handle)


//botão esp32 atualiza serviços
router.post('/btn/barbeiro', new FishBtnEspController().handle)

router.delete('/service/delet', isAuthenticated, new FishSheduleController().handle)

//buscar todos os serviços concluidos
router.get('/service/count', isAuthenticated, new CountController().handle)

//buscar todos valores dos serviços pela data atual
router.get('/service/total', isAuthenticated, new TotalServiceController().handle)

//buscar todos os serviços pela data atual
router.get('/service/data', isAuthenticated, new DataAtualController().handle)


//buscar total valor do serviço pro mês
router.get('/service/mes',isAuthenticated, new TotalMesController().handle)

//buscar a conta de serviços feito no mês
router.get('/service/count/mes',isAuthenticated, new CountMesController().handle)


//--ROTAS PAGAMENTOS STRIPE

router.post('/subscribe', isAuthenticated, new SubscriberController().handle)
router.post('/webhooks', express.raw({ type: 'application/json'}), new WebhooksController().handle)
router.post('/create-portal', isAuthenticated, new CreatePortalController().handle)


//--pdf
router.get('/report', isAuthenticated, new GenerateReportController().handle);



export {router};
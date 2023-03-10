import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post} from "@nestjs/common";
import { ValorParametroService } from './valor_parametro.service';
import { CrearValorParametroDto } from './dto/crear-valor_parametro.dto';
import { ActualizarValorParametroDto } from './dto/actualizar-valor_parametro.dto';
import { ApiResponse, ApiTags} from "@nestjs/swagger";
import {ValorParametro} from "../../framework/database/mysql/entities";
import { Auth } from '../usuario/decorators/auth.decorator';
import { RolesPermitidos } from '../usuario/interfaces/roles-permitidos';

@ApiTags("Valores Parámetros")
@Controller('valores_parametros')
@Auth()
export class ValorParametroController {
    constructor(private readonly valorParametroService: ValorParametroService) {}
    
    @Auth(RolesPermitidos.administrador)
    @ApiResponse({ status: 201, description: 'Valor Parámetro creado correctamente.', type: ValorParametro})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: El Valor parámetro no existe.' })
    @Post()
    create(@Body() crearValorParametroDto: CrearValorParametroDto) {
        return this.valorParametroService.create(crearValorParametroDto);
    }
    

    @ApiResponse({ status: 201, description: 'Valor Parámetro encontrado correctamente.', type: ValorParametro})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: El Valor parámetro no existe.' })
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.valorParametroService.findOne(id);
    }

    
    @Auth(RolesPermitidos.administrador)
    @ApiResponse({ status: 201, description: 'Valor Parámetro actualizado correctamente.', type: ValorParametro})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: El valor parámetro no existe.' })
    @Patch(':id')
    update(@Param('id', ParseIntPipe) id : number, @Body() actualizarValorParametroDto: ActualizarValorParametroDto) {
        return this.valorParametroService.update(+id, actualizarValorParametroDto);
    }
}

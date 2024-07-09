import { Controller, Get, Post, Body, Patch, Param, Delete, Query ,UsePipes,ValidationPipe} from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { ICharacters } from './interface/interface.characters';
import { IdParamDto } from './dto/id-paramdto';


@Controller('characters')// todas las rutas definidas en este controlador estarán precedidas por /characters
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) { } 
  // Inyecta el servicio CharactersService en el controlador.


  @Get() //maneja las solicitudes GET a la ruta /characters
  getAllCharacters(): Promise<ICharacters[]> {
    // El método devuelve una promesa de un array de personajes.
    return this.charactersService.getAllCharacters();//retorna metodo del servicio
  }

  //http://localhost:3000/characters/search?name=simpson
  @Get('search/')
  findByName(@Query('name') name: string): Promise<ICharacters[]> {
    //Obtiene el valor del parámetro de consulta name.
    return this.charactersService.getCharacterByName(name);
  }
  @Get(':id')// maneja solicitudes GET a la ruta /characters/:id. 
  @UsePipes(new ValidationPipe({ transform: true }))// valida y transforma automáticamente los datos de entrada basados en reglas definidas en IdParamDto
   getOneCharacter(@Param()params:IdParamDto): Promise<ICharacters> {
    //Utiliza el decorador @Param('id') para obtener el valor del parámetro de la URL(ID)
    //el objeto params debe coincidir con la estructura definida en IdParamDto
    return this.charactersService.getOneCharacter(params.id);
    // llama al método del servicio para buscar un personaje por su ID y devolverlo.
  }

  @Post()// Maneja las solicitudes POST a la ruta /characters.
  create(@Body() newCharacter: CreateCharacterDto) {
    // Utiliza el decorador @Body() para obtener los datos del cuerpo de la solicitud, sin el id.
    return this.charactersService.createCharacter(newCharacter);
    // Llama al método del servicio para crear un nuevo personaje.
  }
  @Patch(':id')//El método update utiliza @Param('id') para obtener el ID del personaje y @Body() para obtener los datos de actualización. 
  update(@Param('id') id: string, @Body() updateCharacterDto: UpdateCharacterDto): Promise<ICharacters> {
    return this.charactersService.updateCharacter(id, updateCharacterDto); //Llama al método update del servicio para aplicar las actualizaciones.
  }

  @Delete(':id')//solicitudes DELETE en la ruta /characters/:id.
  remove(@Param('id') id: string) : Promise <string> { //decorador @Param para obtener el valor del parámetro de la URL, que corresponde al id del personaje a eliminar.
    return this.charactersService.deleteCharacter(id);
  }
}

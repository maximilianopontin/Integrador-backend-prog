import { Controller, Get, Post, Body, Patch, Param, Delete,Query} from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { ICharacters } from './interface/interface.characters';


@Controller('characters')// todas las rutas definidas en este controlador estarán precedidas por /characters
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) { } // Inyecta el servicio CharactersService en el controlador.


  @Get() //maneja las solicitudes GET a la ruta /characters
  getAllCharacters(): Promise<ICharacters[]> {
    // El método devuelve una promesa de un array de personajes.s
    return this.charactersService.getAllCharacters();
  }

  @Get(':id')// maneja solicitudes GET a la ruta /characters/:id. 
  async getOneCharacter(@Param('id') id: string): Promise<ICharacters> {
    //Utiliza el decorador @Param('id') para obtener el valor del parámetro de la URL
    return this.charactersService.getOneCharacter(id);
    // llama al método del servicio para buscar un personaje por su ID y devolverlo.
  }

  @Get()
  findByName(@Query('name') name: string): Promise<ICharacters[]> {
    return this.charactersService.getByName(name);
  }
  
  @Post()// Maneja las solicitudes POST a la ruta /characters.
  create(@Body() newCharacter: CreateCharacterDto) {
    // Utiliza el decorador @Body() para obtener los datos del cuerpo de la solicitud.
    return this.charactersService.create(newCharacter);
    // Llama al método del servicio para crear un nuevo personaje.
  }
  @Patch(':id')//El método update utiliza @Param('id') para obtener el ID del personaje y @Body() para obtener los datos de actualización. 
  update(@Param('id') id: string, @Body() updateCharacterDto: UpdateCharacterDto): Promise<ICharacters> {
    return this.charactersService.update(id, updateCharacterDto); //Llama al método update del servicio para aplicar las actualizaciones.
  }

  @Delete(':id')//solicitudes DELETE en la ruta /characters/:id.
  remove(@Param('id') id: string): Promise<void> { //decorador @Param('id') para obtener el valor del parámetro de la URL, que corresponde al id del personaje a eliminar.
    return this.charactersService.delete(id);
  }
}

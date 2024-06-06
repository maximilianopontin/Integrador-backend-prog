import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { ICharacters } from './interface/interface.characters';


@Controller('characters')// todas las rutas definidas en este controlador estarán precedidas por /characters
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Post()
 create(@Body() createCharacterDto: CreateCharacterDto): Promise<ICharacters> {
  
    return this.charactersService.create(createCharacterDto);
  }

  @Get() //maneja las solicitudes GET a la ruta /characters
   getAllCharacters(): Promise<ICharacters[]>  {
    return this.charactersService.getAllCharacters();
  }

  @Get(':id')// maneja solicitudes GET a la ruta /characters/:id. 
  async getOneCharacter(@Param('id') id: string): Promise<ICharacters> {
    //Utiliza el decorador @Param('id') para obtener el valor del parámetro de la URL
    return this.charactersService.getOneCharacter(id);
    // llama al método del servicio para buscar un personaje por su ID y devolverlo.
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCharacterDto: UpdateCharacterDto) {
    return this.charactersService.update(+id, updateCharacterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.charactersService.remove(+id);
  }
}

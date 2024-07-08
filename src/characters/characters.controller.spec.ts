import { Test, TestingModule } from '@nestjs/testing';
import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';
import { IdParamDto } from './dto/id-paramdto';

import { ICharacters } from './interface/interface.characters';


describe('CharactersController', () => {
  let characterController: CharactersController;
  let characterService: CharactersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CharactersController],
      providers: [CharactersService],
    }).compile();

    characterController = module.get<CharactersController>(CharactersController);
    characterService = module.get<CharactersService>(CharactersService);
  });

  describe('getAllCharacters', () => {
    it('deberia retornar arreglo de personajes', async () => {
      const result: ICharacters[] = [{
        "id": "5d4c3b2a-1f0e-9b8d-7c6e-5f4e3d2c1b0a",
        "nombre": "Edna Krabappel",
        "edad": 40,
        "ocupacion": "Maestra de la escuela primaria de Springfield",
        "caracteristicas": [
          "Sarcasmo",
          "Soltera",
          "Profesora de Bart",
          "Fumadora",
          "Desencantada",
          "A veces cínica",
          "Compasiva",
          "Deseosa de amor"
        ],
        "familia": []
      }];

      jest.spyOn(characterService, 'getAllCharacters').mockResolvedValue(result);
      // Simula la implementación del método getAllCharacters del servicio para que retorne un resultado predefinido.

      const response = await characterController.getAllCharacters();

      expect(response).toEqual(result);
      //Verifica que la respuesta del controlador sea igual al resultado esperado.
    });
  });

  describe('getOneCharacter', () => {
    it('deberia Retornar un personaje por su id', async () => {
      const id = "7e6d5c4b-3a2f-4b0d-9c8e-7f6e5d4c3b2a";
      const result: ICharacters = {
        "id": id,
        "nombre": "Ralph Wiggum",
        "edad": 8,
        "ocupacion": "Estudiante",
        "caracteristicas": [
          "Ingenuo",
          "Tonto",
          "Hijo del jefe de policía",
          "Simpático",
          "Inocente",
          "Desconcertante",
          "Curioso",
          "Divertido"
        ],
        "familia": [
          "Clancy Wiggum",
          "Sarah Wiggum"
        ]
      };
      // Simula que el servicio devuelve el personaje con el ID válido
      jest.spyOn(characterService, 'getOneCharacter').mockResolvedValue(result);

      // Crea una instancia del DTO con el ID válido
      const paramsDto = new IdParamDto();
      paramsDto.id = id;
      // Llama al método del controlador con el DTO validado
      const response = await characterController.getOneCharacter(paramsDto);
      // Verifica que la respuesta del controlador sea igual al resultado esperado
      expect(response).toEqual(result);
    });
  });

  describe('getCharacterByName', () => {
    it('deberia Retornnar personaje por su nombre', async () => {
      const result: ICharacters[] = [{
        "id": "8d7f9b4a-3c2e-5f6a-7b8d-9e0f1a2b3c4d",
        "nombre": "Moe Szyslak",
        "edad": 48,
        "ocupacion": "Dueño de la Taberna de Moe",
        "caracteristicas": [
          "Amargado",
          "Cínico",
          "Amigo de Homer",
          "Barman",
          "Solitario",
          "Desesperado por amor",
          "Con humor negro",
          "Leal a sus amigos"
        ],
        "familia": []
      }];

      jest.spyOn(characterService, 'getCharacterByName').mockResolvedValue(result);
      //Simula la implementación del método getCharacterByName del servicio para que retorne un resultado predefinido (name)
      const response = await characterController.findByName("moe");

      expect(response).toEqual(result);
    });
  });

  describe('createCharacter', () => {
    it('deberia agregar personaje y poder buscarlo por nombre', async () => {

      const newCharacter: any = {
        "nombre": "OttoMann",
        "edad": 32,
        "ocupacion": "Conductor de autobús escolar",
        "caracteristicas": [
          "Amante del heavy metal",
          "Relajado",
          "Despreocupado",
          "Fuma y bebe ocasionalmente",
          "Vestimenta descuidada",
          "Experto en guitarras",
          "A veces irresponsable",
          "Buen corazón"
        ],
        "familia": ["no posee"]
      };

      jest.spyOn(characterService, 'createCharacter').mockResolvedValue(newCharacter);
      //Simula la implementación del método createCharacter del servicio para que retorne el personaje creado.
      const response = await characterController.create(newCharacter);
      expect(response).toEqual(newCharacter);
    });
  });

  describe('updateCharacter', () => {
    it('deberia actualizar un personaje y retornarlo', async () => {
      const updatedCharacter: ICharacters = {
        "id": "7e6d5c4b-3a2f-4b0d-9c8e-7f6e5d4c3b2a",
        "nombre": "Ralph wiggum",
        "edad": 8,
        "ocupacion": "Estudiante de primer año",
        "caracteristicas": [
          "Ingenuo",
          "Tonto",
          "Hijo del jefe de policía",
          "Simpático",
          "Inocente",
          "Desconcertante",
          "Curioso",
          "Divertido"
        ],
        "familia": [
          "Clancy Wiggum",
          "Sarah Wiggum"
        ]
      };

      jest.spyOn(characterService, 'updateCharacter').mockResolvedValue(updatedCharacter);
      //Simula la implementación del método updateCharacter del servicio para que retorne el personaje actualizado.
      const response = await characterController.update('5f4e3d2c-1b0a-9c8d-7e6f-5d4c3b2a1f0e', updatedCharacter);
      expect(response).toEqual(updatedCharacter);
    });
  });

  describe('deleteCharacter', () => {
    it('eliminar un personaje existente y retorne mensaje de exito', async () => {
      const deleteCharacter: ICharacters = {
        "id": "9a8b7c6d-5e4f-3d2c-1b0e-a9b8c7d6e5f4",
        "nombre": "Krusty el Payaso",
        "edad": 52,
        "ocupacion": "Payaso de televisión",
        "caracteristicas": [
          "Divertido",
          "Desorganizado",
          "Fumador",
          "Amigo de Bart",
          "Cínico",
          "Propenso a vicios",
          "Conduce un programa infantil",
          "A veces triste"
        ],
        "familia": [
          "Hyman Krustofski"
        ]
      };

      jest.spyOn(characterService, 'deleteCharacter').mockResolvedValue(`Personaje con id '${deleteCharacter.id}' eliminado exitosamente`)
      //Simula la implementación del método deleteCharacter del servicio para que retorne un mensaje de éxito.

      const response = await characterController.remove(deleteCharacter.id);
      // Llama al método remove del controlador con el ID del personaje a eliminar

      expect(characterService.deleteCharacter).toHaveBeenCalledWith(deleteCharacter.id);
      // Verifica que el servicio deleteCharacter haya sido llamado con el ID del personaje

      expect(response).toEqual(`Personaje con id '${deleteCharacter.id}' eliminado exitosamente`);
      // Verifica que el mensaje de retorno sea correcto
    });

  });

});
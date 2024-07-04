import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { ICharacters } from './interface/interface.characters';


describe('CharactersService', () => {
  let characterService: CharactersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CharactersService],
    }).compile();

    characterService = module.get<CharactersService>(CharactersService);
  });

 
  describe('getAllCharacters', () => {
    it('retornar arreglo de personajes', async () => {
      const result: ICharacters[] = [{
        "id": "5d4c3b2a-1f0e-9b8d-7c6e-5f4g3h2i1j0k",
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

      const spy = jest.spyOn(characterService, 'getAllCharacters').mockResolvedValue(result);

      const response = await characterService.getAllCharacters();

      expect(response).toEqual(result);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('getOneCharacter', () => {
    it('retornar un personaje por su id', async () => {
      const id = "7e6d5c4b-3a2f-1b0d-9c8e-7f6g5h4i3j2k";
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

      const spy = jest.spyOn(characterService, 'getOneCharacter').mockResolvedValue(result);

      const response = await characterService.getOneCharacter(id);

      expect(response).toEqual(result);
      expect(spy).toHaveBeenCalledWith(id);
    });

    it('lanzar NotFoundException si el personaje no existe', async () => {
      const invalidId = "invalid-id";

      jest.spyOn(characterService, 'getOneCharacter').mockRejectedValue(new NotFoundException());

      await expect(characterService.getOneCharacter(invalidId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('getCharacterByName', () => {
    it('retornar personajes por nombre', async () => {
      const name = "moe";
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

      const spy = jest.spyOn(characterService, 'getCharacterByName').mockResolvedValue(result);

      const response = await characterService.getCharacterByName(name);

      expect(response).toEqual(result);
      expect(spy).toHaveBeenCalledWith(name);
    });
  });

  describe('createCharacter', () => {
    it('agregar un personaje', async () => {
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

      const spy = jest.spyOn(characterService, 'createCharacter').mockResolvedValue(newCharacter);

      const response = await characterService.createCharacter(newCharacter);

      expect(response).toEqual(newCharacter);
      expect(spy).toHaveBeenCalledWith(newCharacter);
    });
  });

  describe('updateCharacter', () => {
    it('actualizar un personaje', async () => {
      const id = "5f4e3d2c-1b0a-9c8d-7e6f-5g4h3i2j1k0l";
      const updatedCharacter: ICharacters = {
        "id": id,
        "nombre": "Paul Skinner",
        "edad": 44,
        "ocupacion": "Director de la escuela primaria de Springfield",
        "caracteristicas": [
          "Estricto",
          "Respetuoso",
          "Vive con su madre",
          "Veterano de guerra",
          "Apasionado por la educación",
          "Sujeto a la autoridad de su madre",
          "Leal",
          "Comprometido"
        ],
        "familia": [
          "Agnes Skinner"
        ]
      };

      const spy = jest.spyOn(characterService, 'updateCharacter').mockResolvedValue(updatedCharacter);

      const response = await characterService.updateCharacter(id, updatedCharacter);

      expect(response).toEqual(updatedCharacter);
      expect(spy).toHaveBeenCalledWith(id, updatedCharacter);
    });
  });

  describe('deleteCharacter', () => {
    it('eliminar un personaje existente', async () => {
      const id = "9a8b7c6d-5e4f-3d2c-1b0e-a9b8c7d6e5f4";

      jest.spyOn(characterService, 'deleteCharacter').mockResolvedValue(`Personaje con id '${id}' eliminado exitosamente`);

      const response = await characterService.deleteCharacter(id);

      expect(response).toEqual(`Personaje con id '${id}' eliminado exitosamente`);
    });

    });
  });

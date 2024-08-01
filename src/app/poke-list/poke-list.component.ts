import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';

import { MatButtonModule } from '@angular/material/button';
import { Pokemon } from '../models/pokemon.model';
import { PokemonService } from '../services/pokemon.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-poke-list',
  standalone: true,
  imports: [NgClass, MatButtonModule, MatCardModule, MatChipsModule],
  templateUrl: './poke-list.component.html',
  styleUrl: './poke-list.component.scss'
})
export class PokeListComponent implements OnInit {
  pokemons: Pokemon[];

  fetchAllPokemonOperationsDoc = `
  query fetchAllPokemon {
    queryPokemon {
      id
      name
      captured
      imgUrl
      pokemonTypes
    }
  }
`;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.fetchAllPokemon();
  }

  fetchAllPokemon() {
    this.pokemonService
      .fetchGraphGL(this.fetchAllPokemonOperationsDoc, 'fetchAllPokemon', {})
      .subscribe((data) => {
        console.log('data: ', data);
        this.pokemons = data.data.queryPokemon;
      });
  }

}

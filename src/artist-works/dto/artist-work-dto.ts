export class CreateArtistWorkDto {
  artistId: string;
  workUrl: string;
}

export class UpdateArtistWorkDto {
  workUrl?: string;
}

import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ArtistModule } from './artist/artist.module';
import { ArtistWorksModule } from './artist-works/artist-works.module';
import { UserModule } from './user/user.module';
import { ReviewsModule } from './reviews/reviews.module';
import { ConfigModule } from '@nestjs/config';
import { TattooImagesModule } from './tattoo-images/tattoo-images.module';
import { ContactFormModule } from './contact-form/contact-form.module';
import { BookingModule } from './booking/booking.module';
import { UnavailableModule } from './unavailable/unavailable.module';
import { DayOffModule } from './day-off/day-off.module';
import { StatusesModule } from './statuses/statuses.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    ArtistModule,
    ArtistWorksModule,
    UserModule,
    ReviewsModule,
    TattooImagesModule,
    ContactFormModule,
    BookingModule,
    UnavailableModule,
    DayOffModule,
    StatusesModule,
  ],
})
export class AppModule {}

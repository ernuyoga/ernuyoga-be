import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profileService: ProfilesService) {}

  @Get()
  get() {
    return this.profileService.get();
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProfileDto) {
    return this.profileService.update(id, dto);
  }
}

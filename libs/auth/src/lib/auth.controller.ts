import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  // Step 1: Redirects the user to Google's OAuth consent screen
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Passport automatically handles the redirect
  }

  // Step 2: Handles the callback from Google
  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request) {
    return {
      message: 'Google authentication successful',
      token: req.user,
    };
  }
}

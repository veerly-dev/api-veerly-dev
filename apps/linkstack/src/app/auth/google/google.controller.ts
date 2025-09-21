// auth/controllers/google.controller.ts
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import type { Request, Response } from 'express';
import { GoogleAuthGuard } from './google-auth.guard';
import { AuthService } from './jwt.service';

@Controller('auth/google')
export class GoogleController {
  constructor(private authService: AuthService) {}

  @Get()
  @UseGuards(GoogleAuthGuard)
  async googleLogin() {
    // Redirects to Google
  }

  @Get('redirect')
  @UseGuards(GoogleAuthGuard)
  async googleRedirect(@Req() req: Request, @Res() res: Response) {
    const user = req.user;
    if (!user) {
      return res.status(400).send('User not found');
    }
    const token = this.authService.issueJwt(
      user as { email: string; name: string; googleId: string }
    );
    return res.redirect(`http://localhost:3000?token=${token}`);
  }
}

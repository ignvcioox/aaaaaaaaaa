 /* if (await this.usersService.findOneByEmail(email))
      throw new BadRequestException('El correo electrónico ya está en uso.');

    const verificationCode = generateVerificationCode();
    const verificationCodeExpires = new Date(Date.now() + 15 * 60 * 1000);

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.usersService.create({
      fullName,
      email,
      password: hashedPassword,
      verificationCode,
      verificationCodeExpires,
      isActive: false,
    });

    const html = createVerificationCodeEmail({
      title: 'Verifica tu correo electrónico',
      message:
        'Gracias por registrarte. Para activar tu cuenta, utiliza el siguiente código de verificación:',
      buttonText: `${verificationCode}`,
      footer: 'El codigo expirará en 10 minutos.',
    });

    await this.sendMail(email, 'Verifica tu correo electrónico', html);

    return {
      message: 'Correo de verificación enviado correctamente.',
    }; */

  /* const verificationToken = await this.jwtService.signAsync(
      { fullName, email, password: await bcrypt.hash(password, 10) },
      { expiresIn: this.verificationTokenExpiresIn },
    ); */

  /* await this.sendMail(
      email,
      'Verifica tu correo electrónico',
      `<p>Tu código de verificación es: <b>${verificationCode}</b></p>`,
    );
 */
  /* const html = createEmailHtml({
      title: '¡Bienvenido a Clean Pro!',
      message:
        'Gracias por registrarte. Para activar tu cuenta, haz clic en el siguiente botón:',
      buttonText: 'Verificar correo',
      buttonUrl: `http://localhost:4200/auth/verify-email?token=${verificationToken}`,
      footer: 'Si no solicitaste este registro, puedes ignorar este mensaje.',
    }); */

  /* await this.sendMail(email, 'Verifica tu correo electrónico', html); */